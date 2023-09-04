import { Injectable } from '@nestjs/common';
import { IAddressRepository } from './iaddress.repository';
import { PrismaService } from 'src/db/prisma.service';
import { CreateAddressInput, UpdateAddressInput } from 'src/domain/dtos';
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
