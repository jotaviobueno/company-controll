import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import {
  CreateTeamInput,
  PaginationOptionsInput,
  UpdateTeamInput,
} from 'src/domain/dtos';
import { ITeamRepository } from './iteam.repository';
import { TeamEntity } from 'src/domain/entities';

@Injectable()
export class TeamRepository implements Partial<ITeamRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreateTeamInput): Promise<TeamEntity> {
    return this.prismaService.team.create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<TeamEntity> {
    return this.prismaService.team.findFirst({
      where: {
        id,
      },
    });
  }

  findAll({ page, per_page }: PaginationOptionsInput): Promise<TeamEntity[]> {
    return this.prismaService.team.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  update({ id, ...updateDto }: UpdateTeamInput): Promise<TeamEntity> {
    return this.prismaService.team.update({
      where: {
        id,
      },
      data: {
        ...updateDto,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<TeamEntity> {
    return this.prismaService.team.update({
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
