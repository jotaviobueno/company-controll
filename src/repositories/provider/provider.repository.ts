import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { IProviderRepository } from './iprovider.repository';
import {
  CreateProviderInput,
  PaginationOptionsInput,
  UpdateProviderInput,
} from 'src/domain/dtos';
import { ProviderEntity } from 'src/domain/entities';

@Injectable()
export class ProviderRepository implements Partial<IProviderRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreateProviderInput): Promise<ProviderEntity> {
    return this.prismaService.provider.create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<ProviderEntity> {
    return this.prismaService.provider.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findManyWithIds(ids: string[]): Promise<ProviderEntity[]> {
    return this.prismaService.provider.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  findAll({
    page,
    per_page,
  }: PaginationOptionsInput): Promise<ProviderEntity[]> {
    return this.prismaService.provider.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  update({ id, ...updateDto }: UpdateProviderInput): Promise<ProviderEntity> {
    return this.prismaService.provider.update({
      where: {
        id,
      },
      data: {
        ...updateDto,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<ProviderEntity> {
    return this.prismaService.provider.update({
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
