import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { ProductEntity } from 'src/domain/entities';
import { IProductRepository } from 'src/repositories/product';

@Injectable()
export class ProductFindOneUseCase
  implements IBaseUseCase<string, ProductEntity>
{
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(data: string): Promise<ProductEntity> {
    const person = await this.productRepository.findById(data);

    if (!person)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return person;
  }
}
