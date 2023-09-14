import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PricingGroupEntity } from 'src/domain/entities';
import { IPricingGroupRepository } from 'src/repositories/pricing-group';

@Injectable()
export class PricingGroupFindOneUseCase
  implements IBaseUseCase<string, PricingGroupEntity>
{
  constructor(
    private readonly pricingGroupRepository: IPricingGroupRepository,
  ) {}

  async execute(data: string): Promise<PricingGroupEntity> {
    const pricingGroup = await this.pricingGroupRepository.findById(data);

    if (!pricingGroup)
      throw new HttpException('Pricing group not found', HttpStatus.NOT_FOUND);

    return pricingGroup;
  }
}
