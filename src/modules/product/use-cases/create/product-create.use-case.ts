import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateProductInput } from 'src/domain/dtos/product';
import { ProductEntity } from 'src/domain/entities';
import { CompanyFindOneUseCase } from 'src/modules/company/use-cases';
import { IProductRepository } from 'src/repositories/product';

@Injectable()
export class ProductCreateUseCase
  implements IBaseUseCase<CreateProductInput, ProductEntity>
{
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly companyFindOneUSeCase: CompanyFindOneUseCase,
  ) {}

  async execute(data: CreateProductInput): Promise<ProductEntity> {
    const company = await this.companyFindOneUSeCase.execute(data.companyId);

    const product = await this.productRepository.create({
      ...data,
      companyId: company.id,
    });

    return product;
  }
}
