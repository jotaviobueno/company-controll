import { Module, ModuleMetadata } from '@nestjs/common';
import { ProviderResolver } from './provider.resolver';
import {
  ProdiverCreateUseCase,
  ProviderFindAllUseCase,
  ProviderFindOneUseCase,
  ProviderUpdateUseCase,
  ProviderSoftDeleteUseCase,
} from './use-cases';
import {
  IProviderRepository,
  ProviderRepository,
} from 'src/repositories/provider';
import { PrismaModule } from 'src/db/prisma.module';

export const providerModuleMock: ModuleMetadata = {
  imports: [PrismaModule],
  providers: [
    ProviderResolver,
    ProdiverCreateUseCase,
    ProviderFindAllUseCase,
    ProviderFindOneUseCase,
    ProviderUpdateUseCase,
    ProviderSoftDeleteUseCase,
    { provide: IProviderRepository, useClass: ProviderRepository },
  ],
  exports: [ProviderFindOneUseCase, ProdiverCreateUseCase],
};

@Module(providerModuleMock)
export class ProviderModule {}
