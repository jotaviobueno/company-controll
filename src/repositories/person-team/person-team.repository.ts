import { Injectable } from '@nestjs/common';
import { IPersonTeamRepository } from './iperson-team.repository';
import { PrismaService } from 'src/db/prisma.service';
import { CreatePersonTeamInput, PaginationOptionsInput } from 'src/domain/dtos';
import { PersonTeamEntity } from 'src/domain/entities';

@Injectable()
export class PersonTeamRepository implements Partial<IPersonTeamRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreatePersonTeamInput): Promise<PersonTeamEntity> {
    return this.prismaService.personTeam.create({
      data: {
        ...createDto,
      },
    });
  }

  findByPersonIdAndTeamId(
    personTeamInput: CreatePersonTeamInput,
  ): Promise<PersonTeamEntity> {
    return this.prismaService.personTeam.findFirst({
      where: {
        ...personTeamInput,
      },
    });
  }

  findAll({
    page,
    per_page,
  }: PaginationOptionsInput): Promise<PersonTeamEntity[]> {
    return this.prismaService.personTeam.findMany({
      where: {},
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }
}
