import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateInvoicePersonDto } from 'src/domain/dtos';
import { IInvoicePersonRepository } from 'src/repositories/invoice-person';

@Injectable()
export class InvoicePersonCreateManyUseCase
  implements IBaseUseCase<CreateInvoicePersonDto[], void>
{
  constructor(
    private readonly invoicePersonRepository: IInvoicePersonRepository,
  ) {}

  execute(data: CreateInvoicePersonDto[]): Promise<void> {
    return this.invoicePersonRepository.createMany(data);
  }
}
