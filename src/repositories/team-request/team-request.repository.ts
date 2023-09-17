import { Injectable } from '@nestjs/common';
import { CreateTeamRequestInput } from 'src/domain/dtos';
import { TeamRequestEntity } from 'src/domain/entities';
import { TEAM_REQUEST_STATUS } from 'src/domain/enums';
import { ITeamRequestRepository } from './iteam-request.repository';

@Injectable()
export class TeamRequestRepository extends ITeamRequestRepository {
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
}
