import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { UpdateJobInput } from 'src/domain/dtos';
import { JobEntity } from 'src/domain/entities';
import { IJobRepository } from 'src/repositories/job';
import { JobFindOneUseCase } from '../find-one';

@Injectable()
export class JobUpdateUseCase
  implements IBaseUseCase<UpdateJobInput, JobEntity>
{
  constructor(
    private readonly jobRepository: IJobRepository,
    private readonly jobFindOneUseCase: JobFindOneUseCase,
  ) {}

  async execute(data: UpdateJobInput): Promise<JobEntity> {
    const job = await this.jobFindOneUseCase.execute(data.id);

    const update = await this.jobRepository.update({ ...data, id: job.id });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
