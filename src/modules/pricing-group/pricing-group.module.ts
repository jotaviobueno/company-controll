import { Module } from '@nestjs/common';
import { PricingGroupResolver } from './pricing-group.resolver';
import {
  IPricingGroupRepository,
  PricingGroupRepository,
} from 'src/repositories/pricing-group';
import {
  PricingGroupCreateUseCase,
  PricingGroupFindAllUseCase,
  PricingGroupFindByNameUseCase,
  PricingGroupFindOneUseCase,
  PricingGroupSoftDeleteUseCase,
  PricingGroupUpdateUseCase,
} from './use-cases';
import { PrismaModule } from 'src/db/prisma.module';

export const pricingGroupModuleMock = {
  imports: [PrismaModule],
  providers: [
    PricingGroupResolver,
    PricingGroupCreateUseCase,
    PricingGroupFindAllUseCase,
    PricingGroupFindByNameUseCase,
    PricingGroupFindOneUseCase,
    PricingGroupSoftDeleteUseCase,
    PricingGroupUpdateUseCase,
    { provide: IPricingGroupRepository, useClass: PricingGroupRepository },
  ],
};

@Module(pricingGroupModuleMock)
export class PricingGroupModule {}
