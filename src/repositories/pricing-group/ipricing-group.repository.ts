import { IBaseRepository } from 'src/domain/base';
import {
  CreatePricingGroupInput,
  UpdatePricingGroupInput,
} from 'src/domain/dtos';
import { PricingGroupEntity } from 'src/domain/entities';

export abstract class IPricingGroupRepository extends IBaseRepository<
  CreatePricingGroupInput,
  PricingGroupEntity,
  UpdatePricingGroupInput
> {
  abstract findByName(name: string): Promise<PricingGroupEntity>;
}
