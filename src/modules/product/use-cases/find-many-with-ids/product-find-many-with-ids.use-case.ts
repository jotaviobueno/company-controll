import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { ProductEntity } from 'src/domain/entities';
import { IProductRepository } from 'src/repositories/product';

@Injectable()
export class ProductFindManyWithIdsUseCase
  implements IBaseUseCase<string[], ProductEntity[]>
{
  constructor(private readonly productRepository: IProductRepository) {}

  execute(data: string[]): Promise<ProductEntity[]> {
    return this.productRepository.findManyWithIds(data);
  }
}
