import { Injectable } from '@nestjs/common';
import { IBaseUseCaseNonePromise } from 'src/domain/base';
import { CreateInvoiceInput } from 'src/domain/dtos';
import { InvoiceCalculatorModel } from 'src/domain/models';
import { InvoiceCalculator } from 'src/domain/utils';

@Injectable()
export class InvoiceCalculatorUseCase
  implements
    IBaseUseCaseNonePromise<CreateInvoiceInput, InvoiceCalculatorModel>
{
  execute(data: CreateInvoiceInput): InvoiceCalculatorModel {
    return new InvoiceCalculator(
      data.quantity,
      data.unitPrice,
      data.discountPercentage,
      data.totalInstallments,
    ).handle();
  }
}
