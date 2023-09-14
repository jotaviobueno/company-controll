import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { InvoiceEntity } from 'src/domain/entities';
import { IInvoiceRepository } from 'src/repositories/invoice';

@Injectable()
export class InvoiceFindOneUseCase
  implements IBaseUseCase<string, InvoiceEntity>
{
  constructor(private readonly invoiceRepository: IInvoiceRepository) {}

  async execute(data: string): Promise<InvoiceEntity> {
    const invoice = await this.invoiceRepository.findById(data);

    if (!invoice)
      throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);

    return invoice;
  }
}
