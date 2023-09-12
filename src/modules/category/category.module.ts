import { Module, ModuleMetadata } from '@nestjs/common';
import { CategoryResolver } from './category.resolver';
import {
  CategoryCreateUseCase,
  CategoryFindAllUseCase,
  CategoryFindOneUseCase,
  CategorySoftDeleteUseCase,
  CategoryUpdateUseCase,
} from './use-cases';
import { PrismaModule } from 'src/db/prisma.module';
import { ICategoryRepository } from 'src/repositories/category/icategory.repository';
import { CategoryRepository } from 'src/repositories/category/category.repository';

export const categoryModuleMock: ModuleMetadata = {
  imports: [PrismaModule],
  providers: [
    CategoryResolver,
    CategoryCreateUseCase,
    CategoryFindAllUseCase,
    CategoryFindOneUseCase,
    CategorySoftDeleteUseCase,
    CategoryUpdateUseCase,
    { provide: ICategoryRepository, useClass: CategoryRepository },
  ],
  exports: [CategoryCreateUseCase, CategoryFindOneUseCase],
};

@Module(categoryModuleMock)
export class CategoryModule {}
