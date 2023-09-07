import { IBaseRepository } from 'src/domain/base';
import {
  CreateProductInput,
  UpdateProductInput,
} from 'src/domain/dtos/product';
import { ProductEntity } from 'src/domain/entities';

export abstract class IProductRepository extends IBaseRepository<
  CreateProductInput,
  ProductEntity,
  UpdateProductInput
> {}
