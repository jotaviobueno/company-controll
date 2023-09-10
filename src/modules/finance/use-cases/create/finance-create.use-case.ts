import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateFinanceInput } from 'src/domain/dtos';
import { FinanceEntity } from 'src/domain/entities';
import { IFinanceRepository } from 'src/repositories/finance';

@Injectable()
export class FinanceCreateUseCase
  implements IBaseUseCase<CreateFinanceInput, FinanceEntity>
{
  constructor(private readonly financeRepository: IFinanceRepository) {}

  execute(data: CreateFinanceInput): Promise<FinanceEntity> {
    return this.financeRepository.create(data);
  }
}
