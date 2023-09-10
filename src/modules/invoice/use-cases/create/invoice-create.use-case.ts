import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateInvoiceInput } from 'src/domain/dtos/invoice';
import { InvoiceEntity } from 'src/domain/entities';
import { INVOICE_STATUS } from 'src/domain/enums/invoice';
import { FinanceCreateUseCase } from 'src/modules/finance/use-cases';
import { IInvoiceRepository } from 'src/repositories/invoice';

@Injectable()
export class InvoiceCreateUseCase
  implements IBaseUseCase<CreateInvoiceInput, InvoiceEntity>
{
  constructor(
    private readonly invoiceRepository: IInvoiceRepository,
    private readonly financeCreateUseCase: FinanceCreateUseCase,
  ) {}

  async execute(data: CreateInvoiceInput): Promise<InvoiceEntity> {
    const invoice = await this.invoiceRepository.create(data);

    if (data.status === INVOICE_STATUS.PAID)
      await this.financeCreateUseCase.execute({ invoiceId: invoice.id });

    return invoice;
  }
}
