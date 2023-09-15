import { Injectable } from '@nestjs/common';
import { IProviderAddressRepository } from './iprovider-address.repository';
import { PrismaService } from 'src/db/prisma.service';
import {
  CreateProviderAddressInput,
  PaginationOptionsInput,
} from 'src/domain/dtos';
import { ProviderAddressEntity } from 'src/domain/entities';

@Injectable()
export class ProviderAddressRepository
  implements Partial<IProviderAddressRepository>
{
  constructor(private readonly prismaService: PrismaService) {}

  create(
    createDto: CreateProviderAddressInput,
  ): Promise<ProviderAddressEntity> {
    return this.prismaService.providerAddress.create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }

  findAll({
    page,
    per_page,
  }: PaginationOptionsInput): Promise<ProviderAddressEntity[]> {
    return this.prismaService.providerAddress.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  findById(id: string): Promise<ProviderAddressEntity> {
    return this.prismaService.providerAddress.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  softDelete(id: string): Promise<ProviderAddressEntity> {
    return this.prismaService.providerAddress.update({
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
