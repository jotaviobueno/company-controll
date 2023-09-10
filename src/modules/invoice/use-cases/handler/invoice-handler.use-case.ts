import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateInvoiceInput } from 'src/domain/dtos';
import { InvoiceEntity } from 'src/domain/entities';
import { InvoiceCreateUseCase } from '../create';
import { InvoiceCalculatorUseCase } from '../calculator';

@Injectable()
export class InvoiceHandlerUseCase
  implements IBaseUseCase<CreateInvoiceInput, InvoiceEntity>
{
  constructor(
    private readonly invoiceCreateUseCase: InvoiceCreateUseCase,
    private readonly invoiceCalculatorUseCase: InvoiceCalculatorUseCase,
  ) {}

  async execute(data: CreateInvoiceInput): Promise<InvoiceEntity> {
    const invoiceCalculator = this.invoiceCalculatorUseCase.execute(data);

    return this.invoiceCreateUseCase.execute({ ...invoiceCalculator, ...data });
  }
}
