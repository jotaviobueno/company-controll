import { Module, ModuleMetadata } from '@nestjs/common';
import { ProviderResolver } from './provider.resolver';
import {
  ProviderCreateUseCase,
  ProviderFindAllUseCase,
  ProviderFindOneUseCase,
  ProviderUpdateUseCase,
  ProviderSoftDeleteUseCase,
  ProviderFindManyWithIdsUseCase,
} from './use-cases';
import {
  IProviderRepository,
  ProviderRepository,
} from 'src/repositories/provider';
import { PrismaModule } from 'src/db/prisma.module';
import { CategoryModule } from '../category/category.module';
import { ProviderCategoryModule } from '../provider-category/provider-category.module';

export const providerModuleMock: ModuleMetadata = {
  imports: [PrismaModule, CategoryModule, ProviderCategoryModule],
  providers: [
    ProviderResolver,
    ProviderCreateUseCase,
    ProviderFindAllUseCase,
    ProviderFindOneUseCase,
    ProviderUpdateUseCase,
    ProviderSoftDeleteUseCase,
    ProviderFindManyWithIdsUseCase,
    { provide: IProviderRepository, useClass: ProviderRepository },
  ],
  exports: [
    ProviderFindOneUseCase,
    ProviderCreateUseCase,
    ProviderFindManyWithIdsUseCase,
  ],
};

@Module(providerModuleMock)
export class ProviderModule {}
