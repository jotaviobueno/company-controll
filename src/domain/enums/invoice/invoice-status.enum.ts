import { registerEnumType } from '@nestjs/graphql';

export enum INVOICE_STATUS {
  OPEN = 'OPEN',
  PAID = 'PAID',
  CANCEL = 'CANCEL',
  PENDING = 'PENDING',
}

registerEnumType(INVOICE_STATUS, {
  name: 'InvoiceStatusEnum',
});
