import { IBaseRepository } from 'src/domain/base';
import { CreateTeamJobInput } from 'src/domain/dtos';
import { TeamJobEntity } from 'src/domain/entities';

export abstract class ITeamJobRepository extends IBaseRepository<
  CreateTeamJobInput,
  TeamJobEntity
> {
  abstract findByTeamIdAndJobId(
    teamId: string,
    jobId: string,
  ): Promise<TeamJobEntity>;
}
