import { Injectable } from '@nestjs/common';
import { IAddressRepository } from './iaddress.repository';
import { PrismaService } from 'src/db/prisma.service';
import {
  CreateAddressInput,
  PaginationOptionsInput,
  UpdateAddressInput,
} from 'src/domain/dtos';
import { AddressEntity } from 'src/domain/entities';

@Injectable()
export class AddressRepository implements Partial<IAddressRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreateAddressInput): Promise<AddressEntity> {
    return this.prismaService.address.create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }

  findAll({
    page,
    per_page,
  }: PaginationOptionsInput): Promise<AddressEntity[]> {
    return this.prismaService.address.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  findById(id: string): Promise<AddressEntity> {
    return this.prismaService.address.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  update({ id, ...updateDto }: UpdateAddressInput): Promise<AddressEntity> {
    return this.prismaService.address.update({
      where: { id },
      data: { ...updateDto, updatedAt: new Date() },
    });
  }

  softDelete(id: string): Promise<AddressEntity> {
    return this.prismaService.address.update({
      where: {
        id,
      },
      data: {
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    });
  }
}
