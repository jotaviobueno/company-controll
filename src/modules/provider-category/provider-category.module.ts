import { Module, ModuleMetadata } from '@nestjs/common';
import { ProviderCategoryCreateUseCase } from './use-cases';
import {
  IProviderCategoryRepository,
  ProviderCategoryRepository,
} from 'src/repositories/provider-category';
import { PrismaModule } from 'src/db/prisma.module';

export const providerCategoryModuleMock: ModuleMetadata = {
  imports: [PrismaModule],
  providers: [
    ProviderCategoryCreateUseCase,
    {
      provide: IProviderCategoryRepository,
      useClass: ProviderCategoryRepository,
    },
  ],
  exports: [ProviderCategoryCreateUseCase],
};

@Module(providerCategoryModuleMock)
export class ProviderCategoryModule {}
