import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateStockInput } from 'src/domain/dtos/stock';
import { StockEntity } from 'src/domain/entities';
import { ProductFindOneUseCase } from 'src/modules/product/use-cases';
import { IStockRepository } from 'src/repositories/stock/istock.repository';

@Injectable()
export class StockCreateIncomeUseCase
  implements IBaseUseCase<CreateStockInput, StockEntity>
{
  constructor(
    private readonly stockRepository: IStockRepository,
    private readonly productFindOneUseCase: ProductFindOneUseCase,
  ) {}

  async execute(data: CreateStockInput): Promise<StockEntity> {
    const product = await this.productFindOneUseCase.execute(data.productId);

    return this.stockRepository.create({ ...data, productId: product.id });
  }
}
