import { Module, ModuleMetadata } from '@nestjs/common';
import {
  ProductCreateUseCase,
  ProductFindOneUseCase,
  ProductSoftDeleteUseCase,
  ProductUpdateUseCase,
  ProductFindAllUseCase,
  ProductFindManyWithIdsUseCase,
} from './use-cases';
import {
  IProductRepository,
  ProductRepository,
} from 'src/repositories/product';
import { CompanyModule } from '../company/company.module';
import { ProductResolver } from './product.resolver';

export const productModuleMock: ModuleMetadata = {
  imports: [CompanyModule],
  providers: [
    ProductResolver,
    ProductCreateUseCase,
    ProductFindOneUseCase,
    ProductUpdateUseCase,
    ProductFindAllUseCase,
    ProductSoftDeleteUseCase,
    ProductFindManyWithIdsUseCase,
    { provide: IProductRepository, useClass: ProductRepository },
  ],
  exports: [ProductFindOneUseCase, ProductFindManyWithIdsUseCase],
};

@Module(productModuleMock)
export class ProductModule {}
