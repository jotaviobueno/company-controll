import * as mercadopago from 'mercadopago';
import { environment } from '../../../config/environment';
import { MercadoPagoPaymentResponseModel } from '../../models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MercadoPago {
  constructor() {
    mercadopago.configurations.setAccessToken(
      environment.MERCADOPAGO_ACCESS_TOKEN,
    );
  }

  findPayment(paymentId: number): Promise<MercadoPagoPaymentResponseModel> {
    return mercadopago.payment.get(paymentId);
  }

  preferences() {
    return mercadopago.preferences.create({
      notification_url: `${environment.MERCADOPAGO_CALLBACK}/mercado-pago`,
      // TODO: Deixar isso de outra forma

      items: [
        {
          id: '64f8b82a51d639a95bdecf87',
          title: 'string',
          quantity: 25,
          unit_price: 10,
        },
        {
          id: '64fcfcba50ddb2bdbc022521',
          title: 'string',
          quantity: 10,
          unit_price: 500,
        },
      ],
    });
  }
}
