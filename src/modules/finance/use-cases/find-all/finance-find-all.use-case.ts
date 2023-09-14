import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { FinanceEntity } from 'src/domain/entities';
import { IFinanceRepository } from 'src/repositories/finance';

@Injectable()
export class FinanceFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, FinanceEntity[]>
{
  constructor(private readonly financeRepository: IFinanceRepository) {}

  execute(data: PaginationOptionsInput): Promise<FinanceEntity[]> {
    return this.financeRepository.findAll(data);
  }
}
