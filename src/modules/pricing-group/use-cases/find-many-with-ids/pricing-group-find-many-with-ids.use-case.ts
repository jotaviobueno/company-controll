import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PricingGroupEntity } from 'src/domain/entities';
import { IPricingGroupRepository } from 'src/repositories/pricing-group';

@Injectable()
export class PricingGroupFindManyWithIdsUseCase
  implements IBaseUseCase<string[], PricingGroupEntity[]>
{
  constructor(
    private readonly pricingGroupRepository: IPricingGroupRepository,
  ) {}

  execute(data: string[]): Promise<PricingGroupEntity[]> {
    return this.pricingGroupRepository.findManyWithIds(data);
  }
}
