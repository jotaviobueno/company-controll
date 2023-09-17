import { Injectable } from '@nestjs/common';
import { PricingGroupEntity } from 'src/domain/entities';
import { IPricingGroupRepository } from './ipricing-group.repository';

@Injectable()
export class PricingGroupRepository extends IPricingGroupRepository {
  findByName(name: string): Promise<PricingGroupEntity> {
    return this.prismaService.pricingGroup.findFirst({
      where: {
        name,
      },
    });
  }

  findManyWithIds(ids: string[]): Promise<PricingGroupEntity[]> {
    return this.prismaService.pricingGroup.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
