import { IBaseRepository } from 'src/domain/base';
import { CreateTeamInput, UpdateTeamInput } from 'src/domain/dtos';
import { TeamEntity } from 'src/domain/entities';

export abstract class ITeamRepository extends IBaseRepository<
  CreateTeamInput,
  TeamEntity,
  UpdateTeamInput
> {}
