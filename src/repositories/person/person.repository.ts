import { Injectable } from '@nestjs/common';
import { IPersonRepository } from './iperson.repository';
import { PrismaService } from 'src/db/prisma.service';
import {
  CreatePersonInput,
  PaginationOptionsInput,
  UpdatePersonInput,
} from 'src/domain/dtos';
import { PersonEntity } from 'src/domain/entities';

@Injectable()
export class PersonRepository implements Partial<IPersonRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    createDto: CreatePersonInput & UpdatePersonInput,
  ): Promise<PersonEntity> {
    return this.prismaService.person.create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }

  findManyWithIds(ids: string[]): Promise<PersonEntity[]> {
    return this.prismaService.person.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  findAll({ page, per_page }: PaginationOptionsInput): Promise<PersonEntity[]> {
    return this.prismaService.person.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  findByAccessId(accessId: string): Promise<PersonEntity> {
    return this.prismaService.person.findFirst({
      where: {
        accessId,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<PersonEntity> {
    return this.prismaService.person.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  update({ id, ...updateDto }: UpdatePersonInput): Promise<PersonEntity> {
    return this.prismaService.person.update({
      where: {
        id,
      },
      data: {
        ...updateDto,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<PersonEntity> {
    return this.prismaService.person.update({
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
