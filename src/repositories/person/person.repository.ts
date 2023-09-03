import { Injectable } from '@nestjs/common';
import { IPersonRepository } from './iperson.repository';
import { PrismaService } from 'src/db/prisma.service';
import { CreatePersonInput, UpdatePersonInput } from 'src/domain/dtos';
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
      },
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
}
