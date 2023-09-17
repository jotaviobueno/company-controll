import { ProductEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IProductRepository extends RepositoryFactory<ProductEntity> {
  constructor() {
    super('product');
  }
}
