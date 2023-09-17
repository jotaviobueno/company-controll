import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateInvoicePersonDto } from 'src/domain/dtos';
import { CreateManyEntity } from 'src/domain/entities';
import { IInvoicePersonRepository } from 'src/repositories/invoice-person';

@Injectable()
export class InvoicePersonCreateManyUseCase
  implements IBaseUseCase<CreateInvoicePersonDto[], CreateManyEntity>
{
  constructor(
    private readonly invoicePersonRepository: IInvoicePersonRepository,
  ) {}

  execute(data: CreateInvoicePersonDto[]): Promise<CreateManyEntity> {
    return this.invoicePersonRepository.createMany(data);
  }
}
