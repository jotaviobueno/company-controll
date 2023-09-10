import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateStockInput } from 'src/domain/dtos/stock';
import { StockEntity } from 'src/domain/entities';
import { STOCK_TYPE_STATUS } from 'src/domain/enums';
import { StockCreateOutcomeUseCase } from '../create-outcome';
import { StockCreateIncomeUseCase } from '../create-income';

// TODO: Criar os nesse arquivo module

@Injectable()
export class StockHandlerUseCase
  implements IBaseUseCase<CreateStockInput, StockEntity>
{
  constructor(
    private readonly stockCreateOutcomeUseCase: StockCreateOutcomeUseCase,
    private readonly stockCreateIncomeUseCase: StockCreateIncomeUseCase,
  ) {}

  async execute(data: CreateStockInput): Promise<StockEntity> {
    switch (data.type) {
      case STOCK_TYPE_STATUS.INCOME:
        return this.stockCreateIncomeUseCase.execute(data);
      case STOCK_TYPE_STATUS.OUTCOME:
        return this.stockCreateOutcomeUseCase.execute(data);
    }
  }
}
