import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PricingGroupFindOneUseCase } from '../find-one';
import { IPricingGroupRepository } from 'src/repositories/pricing-group';

@Injectable()
export class PricingGroupSoftDeleteUseCase
  implements IBaseUseCase<string, boolean>
{
  constructor(
    private readonly pricingGroupFindOneUseCase: PricingGroupFindOneUseCase,
    private readonly pricingGroupRepository: IPricingGroupRepository,
  ) {}

  async execute(data: string): Promise<boolean> {
    const pricingGroup = await this.pricingGroupFindOneUseCase.execute(data);

    const remove = await this.pricingGroupRepository.softDelete(
      pricingGroup.id,
    );

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
