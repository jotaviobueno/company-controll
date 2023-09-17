import { StockEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IStockRepository extends RepositoryFactory<StockEntity> {
  constructor() {
    super('stock');
  }

  abstract findByGTE(productId: string): Promise<StockEntity>;
}
