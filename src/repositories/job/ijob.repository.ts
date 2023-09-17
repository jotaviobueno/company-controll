import { IBaseRepository } from 'src/domain/base';
import { CreateJobInput, UpdateJobInput } from 'src/domain/dtos';
import { JobEntity } from 'src/domain/entities';

export abstract class IJobRepository extends IBaseRepository<
  CreateJobInput,
  JobEntity,
  UpdateJobInput
> {}
