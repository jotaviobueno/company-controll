import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import {
  CreatePricingGroupInput,
  PaginationOptionsInput,
  UpdatePricingGroupInput,
} from 'src/domain/dtos';
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

  findAll({
    page,
    per_page,
  }: PaginationOptionsInput): Promise<PricingGroupEntity[]> {
    return this.prismaService.pricingGroup.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
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

  update({
    id,
    ...updateDto
  }: UpdatePricingGroupInput): Promise<PricingGroupEntity> {
    return this.prismaService.pricingGroup.update({
      where: {
        id,
      },
      data: {
        ...updateDto,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<PricingGroupEntity> {
    return this.prismaService.pricingGroup.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
