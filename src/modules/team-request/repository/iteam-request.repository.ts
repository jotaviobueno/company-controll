import {
  CreateTeamRequestInput,
  PaginationOptionsInput,
  SearchTeamRequestInput,
  UpdateTeamRequestInput,
} from '../../../domain/dtos';
import { TeamRequestSchema } from '../../../domain/models';

export abstract class ITeamRequestRepository {
  abstract create(
    createTeamRequestInput: CreateTeamRequestInput,
  ): Promise<TeamRequestSchema>;
  abstract update(
    teamRequestId: string,
    updateTeamRequestInput: UpdateTeamRequestInput,
  ): Promise<TeamRequestSchema>;
  abstract findByPersonIdAndUnitId(
    personId: string,
    unitId: string,
  ): Promise<TeamRequestSchema>;
  abstract findAll(
    searchTeamRequest: SearchTeamRequestInput,
    paginationOptionsInput: PaginationOptionsInput,
  ): Promise<TeamRequestSchema[]>;
  abstract findById(teamRequestId: string): Promise<TeamRequestSchema>;
  abstract cancel(teamRequestId: string): Promise<TeamRequestSchema>;
}
