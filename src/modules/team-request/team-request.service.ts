import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ITeamRequestRepository } from './repository';
import {
  CreateTeamInput,
  PaginationOptionsInput,
  SearchTeamRequestInput,
  UpdateTeamRequestInput,
} from '../../domain/dtos';

@Injectable()
export class TeamRequestService {
  constructor(private readonly teamRequestRepository: ITeamRequestRepository) {}

  async acceptTeamRequest(teamRequestId: string) {
    const teamRequest = await this.teamRequestService.findOne(teamRequestId);

    const team = await this.teamRepository.create({
      personId: teamRequest.personId,
      unitId: teamRequest.unitId,
    });

    await this.teamRequestService.update(teamRequest.id, {
      status: TEAM_REQUEST_STATUS.ACCEPT,
    });

    return team;
  }

  async refusedTeamRequest(teamRequestId: string) {
    const teamRequest = await this.teamRequestService.findOne(teamRequestId);

    const team = await this.teamRepository.create({
      personId: teamRequest.personId,
      unitId: teamRequest.unitId,
    });

    await this.teamRequestService.update(teamRequest.id, {
      status: TEAM_REQUEST_STATUS.REFUSED,
      refusedAt: new Date(),
    });

    return team;
  }

  findAll(
    searchTeamRequest: SearchTeamRequestInput,
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.teamRequestRepository.findAll(
      searchTeamRequest,
      paginationOptionsInput,
    );
  }

  findByPersonIdAndUnitId(personId: string, unitId: string) {
    return this.teamRequestRepository.findByPersonIdAndUnitId(personId, unitId);
  }

  async update(
    teamRequestId: string,
    updateTeamRequestInput: UpdateTeamRequestInput,
  ) {
    return this.teamRequestRepository.update(
      teamRequestId,
      updateTeamRequestInput,
    );
  }

  async findOne(teamRequestId: string) {
    const teamRequest =
      await this.teamRequestRepository.findById(teamRequestId);

    if (!teamRequest)
      throw new HttpException('Team request not found', HttpStatus.NOT_FOUND);

    return teamRequest;
  }

  async cancel(teamRequestId: string) {
    const teamRequest = await this.findOne(teamRequestId);

    const cancel = await this.teamRequestRepository.cancel(teamRequest.id);

    if (!cancel)
      throw new HttpException(
        'Failed to cancel team request',
        HttpStatus.NOT_ACCEPTABLE,
      );

    return cancel;
  }
}
