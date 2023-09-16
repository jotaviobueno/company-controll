import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { JobEntity } from 'src/domain/entities';
import { IJobRepository } from 'src/repositories/job';

@Injectable()
export class JobFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, JobEntity[]>
{
  constructor(private readonly jobRepository: IJobRepository) {}

  execute(data: PaginationOptionsInput): Promise<JobEntity[]> {
    return this.jobRepository.findAll(data);
  }
}
