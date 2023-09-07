import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { ProductEntity } from 'src/domain/entities';
import { IProductRepository } from 'src/repositories/product';

@Injectable()
export class ProductFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, ProductEntity[]>
{
  constructor(private readonly productRepository: IProductRepository) {}

  execute(data: PaginationOptionsInput): Promise<ProductEntity[]> {
    return this.productRepository.findAll(data);
  }
}
