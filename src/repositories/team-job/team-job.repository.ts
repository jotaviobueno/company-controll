import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateTeamJobInput, PaginationOptionsInput } from 'src/domain/dtos';
import { TeamJobEntity } from 'src/domain/entities';
import { ITeamJobRepository } from './iteam-job.repository';

@Injectable()
export class TeamJobRepository implements Partial<ITeamJobRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreateTeamJobInput): Promise<TeamJobEntity> {
    return this.prismaService.teamJob.create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }

  findByTeamIdAndJobId(teamId: string, jobId: string): Promise<TeamJobEntity> {
    return this.prismaService.teamJob.findFirst({
      where: {
        teamId,
        jobId,
      },
    });
  }

  findById(id: string): Promise<TeamJobEntity> {
    return this.prismaService.teamJob.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findAll({
    page,
    per_page,
  }: PaginationOptionsInput): Promise<TeamJobEntity[]> {
    return this.prismaService.teamJob.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }
}
