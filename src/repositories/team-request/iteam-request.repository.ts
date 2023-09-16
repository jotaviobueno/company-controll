import { IBaseRepository } from 'src/domain/base';
import { CreateTeamRequestInput } from 'src/domain/dtos';
import { UpdateTeamRequestInput } from 'src/domain/dtos/team-request/update-team-request.input';
import { TeamRequestEntity } from 'src/domain/entities';

export abstract class ITeamRequestRepository extends IBaseRepository<
  CreateTeamRequestInput,
  TeamRequestEntity,
  UpdateTeamRequestInput
> {
  abstract findByPersonIdAndPersonId(
    teamRequestInput: CreateTeamRequestInput,
  ): Promise<TeamRequestEntity>;
}
