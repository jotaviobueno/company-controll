import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateStockInput } from 'src/domain/dtos/stock';
import { StockEntity } from 'src/domain/entities';
import { ProductFindOneUseCase } from 'src/modules/product/use-cases';
import { IStockRepository } from 'src/repositories/stock/istock.repository';

@Injectable()
export class StockCreateOutcomeUseCase
  implements IBaseUseCase<CreateStockInput, StockEntity>
{
  constructor(
    private readonly stockRepository: IStockRepository,
    private readonly productFindOneUseCase: ProductFindOneUseCase,
  ) {}

  async execute(data: CreateStockInput): Promise<StockEntity> {
    const product = await this.productFindOneUseCase.execute(data.productId);

    const totalStock = await this.stockRepository.findByGTE(product.id);

    if (!totalStock || data.quantity > totalStock.quantity)
      throw new HttpException(
        'the product does not contain a stock to be sent out.',
        HttpStatus.BAD_REQUEST,
      );

    await this.stockRepository.update({
      id: totalStock.id,
      quantity: totalStock.quantity - data.quantity,
    });

    const stock = await this.stockRepository.create(data);

    return stock;
  }
}
