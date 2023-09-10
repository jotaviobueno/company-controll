import { JsonValue } from '@prisma/client/runtime/library';

export class CreatePaymentDto {
  status: string;
  statusDetail: string;
  operationType: string;
  paymentId: string;
  brand: string;
  method: string;
  cardFirstSixDigits: string;
  cardLastFourDigits: string;
  currency: string;
  fees: JsonValue[];
  amount: number;
  installmentAmount: number;
  totalPaidWithFees: number;
  invoiceId: string;
  approvedAt: Date;
}
