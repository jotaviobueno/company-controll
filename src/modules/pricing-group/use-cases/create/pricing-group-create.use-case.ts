import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreatePricingGroupInput } from 'src/domain/dtos';
import { PricingGroupEntity } from 'src/domain/entities';
import { IPricingGroupRepository } from 'src/repositories/pricing-group';
import { PricingGroupFindByNameUseCase } from '../find-by-name';

@Injectable()
export class PricingGroupCreateUseCase
  implements IBaseUseCase<CreatePricingGroupInput, PricingGroupEntity>
{
  constructor(
    private readonly pricingGroupRepository: IPricingGroupRepository,
    private readonly pricingGroupFindByNameUseCase: PricingGroupFindByNameUseCase,
  ) {}

  async execute(data: CreatePricingGroupInput): Promise<PricingGroupEntity> {
    await this.pricingGroupFindByNameUseCase.execute(data.name);

    const pricingGroup = await this.pricingGroupRepository.create(data);

    return pricingGroup;
  }
}
