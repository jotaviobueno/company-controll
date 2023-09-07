import { Module, ModuleMetadata } from '@nestjs/common';
import {
  ProductCreateUseCase,
  ProductFindOneUseCase,
  ProductSoftDeleteUseCase,
  ProductUpdateUseCase,
  ProductFindAllUseCase,
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
    { provide: IProductRepository, useClass: ProductRepository },
  ],
  exports: [ProductFindOneUseCase],
};

@Module(productModuleMock)
export class ProductModule {}
