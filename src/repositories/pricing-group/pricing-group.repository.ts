import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreatePricingGroupInput } from 'src/domain/dtos';
import { PricingGroupEntity } from 'src/domain/entities';
import { IPricingGroupRepository } from './ipricing-group.repository';

@Injectable()
export class PricingGroupRepository
  implements Partial<IPricingGroupRepository>
{
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreatePricingGroupInput): Promise<PricingGroupEntity> {
    return this.prismaService.pricingGroup.create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }

  findByName(name: string): Promise<PricingGroupEntity> {
    return this.prismaService.pricingGroup.findFirst({
      where: {
        name,
      },
    });
  }

  findById(id: string): Promise<PricingGroupEntity> {
    return this.prismaService.pricingGroup.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
