import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateJobInput } from 'src/domain/dtos';
import { JobEntity } from 'src/domain/entities';
import { IJobRepository } from 'src/repositories/job';

@Injectable()
export class JobCreateUseCase
  implements IBaseUseCase<CreateJobInput, JobEntity>
{
  constructor(private readonly jobRepository: IJobRepository) {}

  execute(data: CreateJobInput): Promise<JobEntity> {
    return this.jobRepository.create(data);
  }
}
