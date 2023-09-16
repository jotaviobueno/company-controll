import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { JobEntity } from 'src/domain/entities';
import { IJobRepository } from 'src/repositories/job';

@Injectable()
export class JobFindOneUseCase implements IBaseUseCase<string, JobEntity> {
  constructor(private readonly jobRepository: IJobRepository) {}

  async execute(data: string): Promise<JobEntity> {
    const job = await this.jobRepository.findById(data);

    if (!job) throw new HttpException('Job not found', HttpStatus.NOT_FOUND);

    return job;
  }
}
