import { Injectable } from '@nestjs/common';
import { ITeamRequestRepository } from './iteam-request.repository';
import {
  CreateTeamRequestInput,
  PaginationOptionsInput,
  SearchTeamRequestInput,
} from '../../../domain/dtos';
import { TeamRequestSchema } from '../../../domain/models';
import { PrismaService } from '../../../db/prisma.service';
import { UpdateTeamRequestInput } from '../../../domain/dtos';

@Injectable()
export class TeamRequestRepository implements ITeamRequestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    createTeamRequestInput: CreateTeamRequestInput,
  ): Promise<TeamRequestSchema> {
    return this.prismaService.teamRequest.create({
      data: {
        ...createTeamRequestInput,
        status: 'PENDING',
        refusedAt: null,
        calceledAt: null,
      },
    });
  }

  update(
    teamRequestId: string,
    updateTeamRequestInput: UpdateTeamRequestInput,
  ): Promise<TeamRequestSchema> {
    return this.prismaService.teamRequest.update({
      where: {
        id: teamRequestId,
      },
      data: {
        ...updateTeamRequestInput,
      },
    });
  }

  findAll(
    searchTeamRequest: SearchTeamRequestInput,
    { page, per_page }: PaginationOptionsInput,
  ): Promise<TeamRequestSchema[]> {
    return this.prismaService.teamRequest.findMany({
      where:
        Object.keys(searchTeamRequest).length != 0
          ? {
              OR: [
                searchTeamRequest.personId && {
                  personId: searchTeamRequest.personId,
                  status: 'PENDING',
                  refusedAt: null,
                  calceledAt: null,
                },
                searchTeamRequest.unitId && {
                  unitId: searchTeamRequest.unitId,
                  status: 'PENDING',
                  refusedAt: null,
                  calceledAt: null,
                },
              ],
            }
          : {
              status: 'PENDING',
              refusedAt: null,
              calceledAt: null,
            },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  findById(teamRequestId: string): Promise<TeamRequestSchema> {
    return this.prismaService.teamRequest.findFirst({
      where: {
        id: teamRequestId,
        status: 'PENDING',
        refusedAt: null,
        calceledAt: null,
      },
    });
  }

  findByPersonIdAndUnitId(
    personId: string,
    unitId: string,
  ): Promise<TeamRequestSchema> {
    return this.prismaService.teamRequest.findFirst({
      where: {
        personId,
        unitId,
      },
    });
  }

  cancel(teamRequestId: string): Promise<TeamRequestSchema> {
    return this.prismaService.teamRequest.update({
      where: {
        id: teamRequestId,
      },
      data: {
        status: 'CANCELED',
        calceledAt: new Date(),
      },
    });
  }
}
