import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { PricingGroupEntity } from 'src/domain/entities';
import { IPricingGroupRepository } from 'src/repositories/pricing-group';

@Injectable()
export class PricingGroupFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, PricingGroupEntity[]>
{
  constructor(
    private readonly pricingGroupRepository: IPricingGroupRepository,
  ) {}

  execute(data: PaginationOptionsInput): Promise<PricingGroupEntity[]> {
    return this.pricingGroupRepository.findAll(data);
  }
}
