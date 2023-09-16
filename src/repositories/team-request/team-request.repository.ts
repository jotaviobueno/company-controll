import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import {
  CreateTeamRequestInput,
  PaginationOptionsInput,
} from 'src/domain/dtos';
import { TeamRequestEntity } from 'src/domain/entities';
import { TEAM_REQUEST_STATUS } from 'src/domain/enums';
import { ITeamRequestRepository } from './iteam-request.repository';
import { UpdateTeamRequestInput } from 'src/domain/dtos/team-request/update-team-request.input';

@Injectable()
export class TeamRequestRepository implements Partial<ITeamRequestRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreateTeamRequestInput): Promise<TeamRequestEntity> {
    return this.prismaService.teamRequest.create({
      data: {
        ...createDto,
        status: TEAM_REQUEST_STATUS.PENDING,
      },
    });
  }

  findById(id: string): Promise<TeamRequestEntity> {
    return this.prismaService.teamRequest.findFirst({
      where: {
        id,
        status: TEAM_REQUEST_STATUS.PENDING,
      },
    });
  }

  findByPersonIdAndPersonId(
    teamRequestInput: CreateTeamRequestInput,
  ): Promise<TeamRequestEntity> {
    return this.prismaService.teamRequest.findFirst({
      where: {
        ...teamRequestInput,
      },
    });
  }

  findAll({
    page,
    per_page,
  }: PaginationOptionsInput): Promise<TeamRequestEntity[]> {
    return this.prismaService.teamRequest.findMany({
      where: {},
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  update({
    id,
    ...updateDto
  }: UpdateTeamRequestInput): Promise<TeamRequestEntity> {
    return this.prismaService.teamRequest.update({
      where: { id },
      data: {
        ...updateDto,
        updatedAt: new Date(),
      },
    });
  }
}
