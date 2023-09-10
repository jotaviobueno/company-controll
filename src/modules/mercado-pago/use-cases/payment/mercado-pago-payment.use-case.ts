import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import {
  CreateInvoiceInput,
  CreatePaymentNotificationDto,
  CustomerCompanyInput,
} from 'src/domain/dtos';
import {
  INVOICE_PAYMENT_TYPE,
  INVOICE_STATUS,
  STOCK_TYPE_STATUS,
} from 'src/domain/enums';
import { MercadoPago } from 'src/domain/utils';
import { CustomerCompanyCreateManyUseCase } from 'src/modules/customer-company/use-cases';
import {
  CustomerFindByCpfUseCase,
  CustomerSimpleCreateUseCase,
} from 'src/modules/customer/use-cases';
import { InvoiceCompanyCreateManyUseCase } from 'src/modules/invoice-company/use-cases';
import { InvoiceCustomerCreateUseCase } from 'src/modules/invoice-customer/use-cases';
import { InvoiceProductCreateManyUseCase } from 'src/modules/invoice-product/use-case';
import { InvoiceHandlerUseCase } from 'src/modules/invoice/use-cases';
import {
  PaymentNotificationCreateUseCase,
  PaymentNotificationFindByPaymentIdUseCase,
} from 'src/modules/payment-notification/use-cases';
import {
  PaymentCreateUseCase,
  PaymentFindByPaymentIdUseCase,
} from 'src/modules/payment/use-cases';
import { ProductFindManyWithIdsUseCase } from 'src/modules/product/use-cases';
import { StockHandlerUseCase } from 'src/modules/stock/use-cases';

@Injectable()
export class MercadoPagoPaymentUseCase implements IBaseUseCase<any, boolean> {
  constructor(
    private readonly mercadopago: MercadoPago,
    private readonly invoiceHandlerUseCase: InvoiceHandlerUseCase,
    private readonly paymentNotificationUseCase: PaymentNotificationCreateUseCase,
    private readonly paymentCreateUseCase: PaymentCreateUseCase,
    private readonly paymentFindByPaymentIdUseCase: PaymentFindByPaymentIdUseCase,
    private readonly productFindManyWithIdsUseCase: ProductFindManyWithIdsUseCase,
    private readonly invoiceProductCreateManyUseCase: InvoiceProductCreateManyUseCase,
    private readonly invoiceCompanyCreateManyUseCase: InvoiceCompanyCreateManyUseCase,
    private readonly customerFindByCpfUseCase: CustomerFindByCpfUseCase,
    private readonly customerSimpleCreateUseCase: CustomerSimpleCreateUseCase,
    private readonly customerCompanyCreateManyUseCase: CustomerCompanyCreateManyUseCase,
    private readonly invoiceCustomerCreateUseCase: InvoiceCustomerCreateUseCase,
    private readonly paymentNotificationFindByPaymentIdUseCase: PaymentNotificationFindByPaymentIdUseCase,
    private readonly stockHandlerUseCase: StockHandlerUseCase,
  ) {}

  async execute(data: any): Promise<boolean> {
    try {
      const paymentNotificationAlreadyExist =
        await this.paymentNotificationFindByPaymentIdUseCase.execute(
          data['data.id'],
        );

      if (paymentNotificationAlreadyExist) return true;

      const { response } = await this.mercadopago.findPayment(+data['data.id']);

      let finalPrice = 0;

      const items = (response.additional_info.items as any).map(
        ({ id, ...item }) => (
          (finalPrice += +item.unit_price),
          {
            ...item,
            unit_price: item.unit_price * 100,
            productId: id,
          }
        ),
      );

      const productsIds = (response.additional_info.items as any).map(
        (items) => items.id,
      );

      const products =
        await this.productFindManyWithIdsUseCase.execute(productsIds);

      const companiesIds = products.map((product) => product.companyId);

      const createInvoiceInput: CreateInvoiceInput = {
        paymentType: INVOICE_PAYMENT_TYPE.INCOME,
        status:
          response.status === 'approved'
            ? INVOICE_STATUS.PAID
            : INVOICE_STATUS.PENDING,
        totalInstallments: response.installments,
        finalPrice: finalPrice * 100,
      };

      const invoice =
        await this.invoiceHandlerUseCase.execute(createInvoiceInput);

      const productInvoice = productsIds.map((productId) => ({
        productId,
        invoiceId: invoice.id,
      }));

      await this.invoiceProductCreateManyUseCase.execute(productInvoice);

      const invoiceCompany = companiesIds.map((companyId) => ({
        companyId,
        invoiceId: invoice.id,
      }));

      await this.invoiceCompanyCreateManyUseCase.execute(invoiceCompany);

      let payment = await this.paymentFindByPaymentIdUseCase.execute(
        data['data.id'],
      );

      if (!payment)
        payment = await this.paymentCreateUseCase.execute({
          status: response.status,
          statusDetail: response.status_detail,
          paymentId: data['data.id'],
          operationType: response.operation_type,
          brand: response.payment_method.id,
          method: response.payment_method.type,
          cardFirstSixDigits: response.card.first_six_digits,
          cardLastFourDigits: response.card.last_four_digits,
          currency: response.currency_id,
          fees: response.fee_details,
          amount: response.transaction_amount * 100,
          installmentAmount:
            response.transaction_details.installment_amount * 100,
          totalPaidWithFees:
            response.transaction_details.total_paid_amount * 100,
          invoiceId: invoice.id,
          approvedAt: response.date_approved,
        });

      const createPaymentNotificationDto: CreatePaymentNotificationDto = {
        action: data.type,
        paymentId: data['data.id'],
        apiVersion: data.api_version,
        genericId: `${data.id}`,
        liveMode: data.live_mode,
        type: data.type,
        mercadoPagoUserId: data.user_id,
      };

      await this.paymentNotificationUseCase.execute(
        createPaymentNotificationDto,
      );

      let customer = await this.customerFindByCpfUseCase.execute(
        response.card.cardholder.identification.number,
      );

      if (!customer)
        customer = await this.customerSimpleCreateUseCase.execute({
          name: response.card.cardholder.name,
          cpf: response.card.cardholder.identification.number,
        });

      const createCustomerCompanyInput: CustomerCompanyInput[] =
        companiesIds.map((companyId) => ({
          companyId,
          customerId: customer.id,
        }));

      await this.customerCompanyCreateManyUseCase.execute(
        createCustomerCompanyInput,
      );

      await this.invoiceCustomerCreateUseCase.execute({
        invoiceId: invoice.id,
        customerId: customer.id,
      });

      // TODO: ARRUMAR AQUI, RETIRADA DE STOCK APOS A VENDA
      // AO EMITIR UM PREFERENCES VERIFICAR SE O PRODUTO TEM ESTOQUE ANTES DE EMITIR
      items.forEach(async (item) => {
        await this.stockHandlerUseCase.execute({
          productId: item.productId,
          quantity: +item.quantity,
          type: STOCK_TYPE_STATUS.OUTCOME,
        });
      });

      return true;
    } catch (e) {
      Logger.debug('FAILED TO HANDLE PAYMENT NOTIFICATION', e.message);

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
