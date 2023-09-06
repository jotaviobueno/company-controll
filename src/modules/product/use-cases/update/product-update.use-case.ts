import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { UpdateProductInput } from 'src/domain/dtos/product';
import { IProductRepository } from 'src/repositories/product';
import { ProductFindOneUseCase } from '../find-one';

@Injectable()
export class ProductUpdateUseCase
  implements IBaseUseCase<UpdateProductInput, UpdateProductInput>
{
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly productFindOneUseCase: ProductFindOneUseCase,
  ) {}

  async execute(data: UpdateProductInput): Promise<UpdateProductInput> {
    const product = await this.productFindOneUseCase.execute(data.id);

    const update = await this.productRepository.update({
      ...data,
      id: product.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
