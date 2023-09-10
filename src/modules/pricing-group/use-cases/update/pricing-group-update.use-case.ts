import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { UpdatePricingGroupInput } from 'src/domain/dtos';
import { PricingGroupEntity } from 'src/domain/entities';
import { PricingGroupFindOneUseCase } from '../find-one';
import { IPricingGroupRepository } from 'src/repositories/pricing-group';

@Injectable()
export class PricingGroupUpdateUseCase
  implements IBaseUseCase<UpdatePricingGroupInput, PricingGroupEntity>
{
  constructor(
    private readonly pricingGroupFindOneUseCase: PricingGroupFindOneUseCase,
    private readonly pricingGroupRepository: IPricingGroupRepository,
  ) {}

  async execute(data: UpdatePricingGroupInput): Promise<PricingGroupEntity> {
    const pricingGroup = await this.pricingGroupFindOneUseCase.execute(data.id);

    const update = await this.pricingGroupRepository.update({
      ...data,
      id: pricingGroup.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
