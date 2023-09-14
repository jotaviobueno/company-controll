import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { InvoiceEntity } from 'src/domain/entities';
import { IInvoiceRepository } from 'src/repositories/invoice';

@Injectable()
export class InvoiceFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, InvoiceEntity[]>
{
  constructor(private readonly invoiceRepository: IInvoiceRepository) {}

  execute(data: PaginationOptionsInput): Promise<InvoiceEntity[]> {
    return this.invoiceRepository.findAll(data);
  }
}
