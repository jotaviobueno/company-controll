import { IBaseRepository } from 'src/domain/base';
import { CreateStockInput, UpdateStockInput } from 'src/domain/dtos/stock';
import { StockEntity } from 'src/domain/entities';

export abstract class IStockRepository extends IBaseRepository<
  CreateStockInput,
  StockEntity,
  UpdateStockInput
> {
  abstract findByGTE(productId: string): Promise<StockEntity>;
}
