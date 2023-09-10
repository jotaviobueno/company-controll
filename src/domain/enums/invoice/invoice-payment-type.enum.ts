import { registerEnumType } from '@nestjs/graphql';

export enum INVOICE_PAYMENT_TYPE {
  INCOME = 'INCOME',
  OUTCOME = 'OUTCOME',
}

registerEnumType(INVOICE_PAYMENT_TYPE, {
  name: 'InvoicePaymentType',
});
