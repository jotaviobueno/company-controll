import { Injectable } from '@nestjs/common';
import { IInvoiceRepository } from './iinvoice.repository';

@Injectable()
export class InvoiceRepository extends IInvoiceRepository {}
