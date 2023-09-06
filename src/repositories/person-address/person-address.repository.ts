import { Injectable } from '@nestjs/common';
import { IPersonAddressRepository } from './iperson-address.repository';
import { PrismaService } from 'src/db/prisma.service';
import {
  CreatePersonAddressInput,
  PaginationOptionsInput,
} from 'src/domain/dtos';
import { PersonAddressEntity } from 'src/domain/entities';

@Injectable()
export class PersonAddressRepository
  implements Partial<IPersonAddressRepository>
{
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreatePersonAddressInput): Promise<PersonAddressEntity> {
    return this.prismaService.personAddress.create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<PersonAddressEntity> {
    return this.prismaService.personAddress.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findAll({
    page,
    per_page,
  }: PaginationOptionsInput): Promise<PersonAddressEntity[]> {
    return this.prismaService.personAddress.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  softDelete(id: string): Promise<PersonAddressEntity> {
    return this.prismaService.personAddress.update({
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
