import { PricingGroupEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IPricingGroupRepository extends RepositoryFactory<PricingGroupEntity> {
  constructor() {
    super('pricingGroup');
  }

  abstract findByName(name: string): Promise<PricingGroupEntity>;
}
