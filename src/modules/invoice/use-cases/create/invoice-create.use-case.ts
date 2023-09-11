import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateInvoiceInput } from 'src/domain/dtos/invoice';
import { InvoiceEntity } from 'src/domain/entities';
import { INVOICE_STATUS } from 'src/domain/enums/invoice';
import { FinanceCreateUseCase } from 'src/modules/finance/use-cases';
import { IInvoiceRepository } from 'src/repositories/invoice';
import { PersonFindManyWithIdsUseCase } from 'src/modules/person/use-cases';
import { CustomerFindManyWithIdsUseCase } from 'src/modules/customer/use-cases';
import { CompanyFindManyWithIdsUseCase } from 'src/modules/company/use-cases';
import { ProductFindManyWithIdsUseCase } from 'src/modules/product/use-cases';
import { PricingGroupFindManyWithIdsUseCase } from 'src/modules/pricing-group/use-cases';
import { InvoicePersonCreateManyUseCase } from 'src/modules/invoice-person/use-cases';
import { InvoiceProductCreateManyUseCase } from 'src/modules/invoice-product/use-case';
import { InvoiceCustomerCreateUseCase } from 'src/modules/invoice-customer/use-cases';
import { InvoiceCompanyCreateManyUseCase } from 'src/modules/invoice-company/use-cases';
import { InvoicePricingGroupCreateManyUseCase } from 'src/modules/invoice-pricing-group/use-cases';

@Injectable()
export class InvoiceCreateUseCase
  implements IBaseUseCase<CreateInvoiceInput, InvoiceEntity>
{
  constructor(
    private readonly invoiceRepository: IInvoiceRepository,
    private readonly financeCreateUseCase: FinanceCreateUseCase,
    //
    private readonly personFindManyWithIdsUseCase: PersonFindManyWithIdsUseCase,
    private readonly invoicePersonCreateManyUseCase: InvoicePersonCreateManyUseCase,
    //
    private readonly customerFindManyWithIdsUseCase: CustomerFindManyWithIdsUseCase,
    private readonly invoiceCustomerCreateManyUseCase: InvoiceCustomerCreateUseCase,
    //
    private readonly invoiceCompanyCreateManyUseCase: InvoiceCompanyCreateManyUseCase,
    private readonly companyFindManyWithIdsUseCase: CompanyFindManyWithIdsUseCase,
    //
    private readonly productFindManyWithIdsUseCase: ProductFindManyWithIdsUseCase,
    private readonly invoiceProductCreateManyUseCase: InvoiceProductCreateManyUseCase,
    //
    private readonly pricingGroupFindManyWithIdsUseCase: PricingGroupFindManyWithIdsUseCase,
    private readonly invoicePricingGroupCreateManyUseCase: InvoicePricingGroupCreateManyUseCase,
  ) {}

  async execute({
    personsIds,
    productsIds,
    companiesIds,
    customersIds,
    pricingGroupsId,
    ...data
  }: CreateInvoiceInput): Promise<InvoiceEntity> {
    const invoice = await this.invoiceRepository.create(data);

    if (data.status === INVOICE_STATUS.PAID)
      await this.financeCreateUseCase.execute({ invoiceId: invoice.id });

    // TODO: talvez melhorar isso, está funcionando mas está muito grande

    if (personsIds?.length > 0) {
      const persons =
        await this.personFindManyWithIdsUseCase.execute(personsIds);

      persons.forEach((person) => {
        if (!person)
          throw new HttpException('Person not found', HttpStatus.NOT_FOUND);
      });

      await this.invoicePersonCreateManyUseCase.execute(
        personsIds?.map((personId) => ({ invoiceId: invoice.id, personId })),
      );
    }

    if (companiesIds?.length > 0) {
      const companies =
        await this.companyFindManyWithIdsUseCase.execute(companiesIds);

      companies.forEach((comapny) => {
        if (!comapny)
          throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
      });

      await this.invoiceCompanyCreateManyUseCase.execute(
        companiesIds?.map((companyId) => ({
          invoiceId: invoice.id,
          companyId,
        })),
      );
    }

    if (productsIds?.length > 0) {
      const products =
        await this.productFindManyWithIdsUseCase.execute(productsIds);

      products.forEach((customer) => {
        if (!customer)
          throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      });

      await this.invoiceProductCreateManyUseCase.execute(
        productsIds?.map((productId) => ({ invoiceId: invoice.id, productId })),
      );
    }

    if (customersIds?.length > 0) {
      const customers =
        await this.customerFindManyWithIdsUseCase.execute(customersIds);

      customers.forEach((customer) => {
        if (!customer)
          throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      });

      await this.invoiceCustomerCreateManyUseCase.execute(
        customersIds?.map((customerId) => ({
          invoiceId: invoice.id,
          customerId,
        })),
      );
    }

    if (pricingGroupsId?.length > 0) {
      const pricingGroups =
        await this.pricingGroupFindManyWithIdsUseCase.execute(pricingGroupsId);

      pricingGroups.forEach((pricingGroup) => {
        if (!pricingGroup)
          throw new HttpException(
            'Pricing Group not found',
            HttpStatus.NOT_FOUND,
          );
      });

      await this.invoicePricingGroupCreateManyUseCase.execute(
        pricingGroupsId?.map((pricingGroupId) => ({
          invoiceId: invoice.id,
          pricingGroupId,
        })),
      );
    }

    return invoice;
  }
}
