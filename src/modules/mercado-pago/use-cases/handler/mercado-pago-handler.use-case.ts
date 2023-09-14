import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { MercadoPagoPaymentUseCase } from '../payment';
import { PaymentNotificationCreateUseCase } from 'src/modules/payment-notification/use-cases';

@Injectable()
export class MercadoPagoHandlerUseCase implements IBaseUseCase<any, any> {
  constructor(
    private readonly mercadoPagoPaymentUseCase: MercadoPagoPaymentUseCase,
    private readonly paymentNotificationCreateUseCase: PaymentNotificationCreateUseCase,
  ) {}

  async execute(data: any): Promise<any> {
    if (data?.type === 'payment')
      return this.mercadoPagoPaymentUseCase.execute(data);

    return this.paymentNotificationCreateUseCase.execute(data);
  }
}
