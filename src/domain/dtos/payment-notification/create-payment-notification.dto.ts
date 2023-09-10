export class CreatePaymentNotificationDto {
  id?: string;
  resource?: string;
  action?: string;
  topic?: string;
  apiVersion?: string;
  transferId?: string;
  genericId?: string;
  paymentId?: string;
  mercadoPagoUserId?: string;
  liveMode?: boolean;
  type?: string;
}
