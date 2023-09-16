import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { IJobRepository } from 'src/repositories/job';
import { JobFindOneUseCase } from '../find-one';

@Injectable()
export class JobSoftDeleteUseCase implements IBaseUseCase<string, boolean> {
  constructor(
    private readonly jobRepository: IJobRepository,
    private readonly jobFindOneUseCase: JobFindOneUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const job = await this.jobFindOneUseCase.execute(data);

    const remove = await this.jobRepository.softDelete(job.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
