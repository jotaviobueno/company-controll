import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { ProductFindOneUseCase } from '../find-one';
import { IProductRepository } from 'src/repositories/product';

@Injectable()
export class ProductSoftDeleteUseCase implements IBaseUseCase<string, boolean> {
  constructor(
    private readonly productFindOneUseCase: ProductFindOneUseCase,
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(data: string): Promise<boolean> {
    const product = await this.productFindOneUseCase.execute(data);

    const remove = await this.productRepository.softDelete(product.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
