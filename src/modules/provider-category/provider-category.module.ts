import { Module, ModuleMetadata } from '@nestjs/common';
import { ProviderCategoryCreateManyUseCase } from './use-cases';
import {
  IProviderCategoryRepository,
  ProviderCategoryRepository,
} from 'src/repositories/provider-category';
import { PrismaModule } from 'src/db/prisma.module';

export const providerCategoryModuleMock: ModuleMetadata = {
  imports: [PrismaModule],
  providers: [
    ProviderCategoryCreateManyUseCase,
    {
      provide: IProviderCategoryRepository,
      useClass: ProviderCategoryRepository,
    },
  ],
  exports: [ProviderCategoryCreateManyUseCase],
};

@Module(providerCategoryModuleMock)
export class ProviderCategoryModule {}
