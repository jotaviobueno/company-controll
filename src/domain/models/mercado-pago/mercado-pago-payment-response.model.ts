import { JsonValue } from '@prisma/client/runtime/library';

class AdditionalInfo {
  authentication_code: unknown;
  available_balance: unknown;
  ip_address: string;
  items: JsonValue[];
  nsu_processadora: unknown;
}

// retorno da linha 5
//class Item {
//  category_id: string | number | null;
//  description: string | null;
//  id: string | null;
//  picture_url: string | null;
//  quantity: string;
//  title: string | null;
//  unit_price: string;
//}

class Card {
  cardholder: CardHolder;
  date_created: Date;
  date_last_updated: Date;
  expiration_month: number;
  expiration_year: number;
  first_six_digits: string;
  id: string | null;
  last_four_digits: string;
}

class CardHolder {
  identification: CardIndentification;
  name: string;
}

class CardIndentification {
  number: string;
  type: string;
}

class ChargesDetails {
  accounts: Accounts;
  amounts: Amount;
  client_id: number;
  date_created: Date;
  id: string;
  last_updated: Date;
  metadata: any;
  name: string;
  refund_charges: unknown[];
  reserve_id: string | null;
  type: string;
}

class Accounts {
  from: string;
  to: string;
}

class Amount {
  original: number;
  refunded: number;
}

// RETORNO FEES DETAILS
// class FeeDetails {
//   amount: number;
//   fee_payer: string;
//   type: string;
// }

class Order {
  id: string;
  type: string;
}

class Identification {
  number: string;
  type: string;
}

class Phone {
  area_code: string | null;
  number: string | null;
  extension: string | null;
}

class Payer {
  first_name: string | null;
  last_name: string | null;
  email: string;
  identification: Identification;
  phone: Phone;
  type: string | null;
  entity_type: string | null;
  id: string;
}

class PaymentMethod {
  id: string;
  issuer_id: string;
  type: string;
}

class BusinessInfo {
  sub_unit: string;
  unit: string;
}

class TransactionData {
  e2e_id: unknown;
}

class PointOfInteraction {
  business_info: BusinessInfo;
  transaction_data: TransactionData;
  type: string;
}

class TransactionDetails {
  acquirer_reference: unknown;
  external_resource_url: unknown;
  financial_institution: unknown;
  installment_amount: number;
  net_received_amount: number;
  overpaid_amount: number;
  payable_deferral_period: unknown;
  payment_method_reference_id: unknown;
  total_paid_amount: number;
}

class Response {
  accounts_info: unknown;
  acquirer_reconciliation: unknown[];
  additional_info: AdditionalInfo;
  authorization_code: null;
  binary_mode: boolean;
  brand_id: string | null;
  build_version: string;
  call_for_authorize_id: unknown;
  captured: boolean;
  card: Card;
  charges_details: ChargesDetails[];
  collector_id: number;
  corporation_id: string | null;
  counter_currency: string | null;
  coupon_amount: number;
  currency_id: string;
  date_approved: Date;
  date_created: Date;
  date_last_updated: Date;
  date_of_expiration: string | null;
  deduction_schema: string | null;
  description: string;
  differential_pricing_id: string | null;
  external_reference: string | null;
  fee_details: JsonValue[];
  financing_group: unknown;
  id: number;
  installments: number;
  integrator_id: unknown;
  issuer_id: string;
  live_mode: boolean;
  marketplace_owner: string | null;
  merchant_account_id: string | null;
  merchant_number: string | null;
  metadata: any;
  money_release_date: Date;
  money_release_schema: string | null;
  money_release_status: string | null;
  notification_url: string | null;
  operation_type: string;
  order: Order;
  payer: Payer;
  payment_method: PaymentMethod;
  payment_method_id: string;
  payment_type_id: string;
  platform_id: string | null;
  point_of_interaction: PointOfInteraction;
  pos_id: string | null;
  processing_mode: string;
  refunds: unknown[];
  shipping_amount: number;
  sponsor_id: string | null;
  statement_descriptor: string;
  status: string;
  status_detail: string;
  store_id: string | null;
  tags: unknown;
  taxes_amount: number;
  transaction_amount: number;
  transaction_amount_refunded: number;
  transaction_details: TransactionDetails;
}

export class MercadoPagoPaymentResponseModel {
  body: any;
  response: Response;
  status: number;
}
