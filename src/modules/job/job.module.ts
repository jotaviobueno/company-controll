import { Module, ModuleMetadata } from '@nestjs/common';
import { IJobRepository, JobRepository } from 'src/repositories/job';
import {
  JobCreateUseCase,
  JobFindAllUseCase,
  JobFindOneUseCase,
  JobSoftDeleteUseCase,
  JobUpdateUseCase,
} from './use-cases';
import { JobResolver } from './job.resolver';
import { PrismaModule } from 'src/db/prisma.module';

export const jobModuleMock: ModuleMetadata = {
  imports: [PrismaModule],
  providers: [
    JobResolver,
    JobCreateUseCase,
    JobFindAllUseCase,
    JobFindOneUseCase,
    JobSoftDeleteUseCase,
    JobUpdateUseCase,
    { provide: IJobRepository, useClass: JobRepository },
  ],
  exports: [JobFindOneUseCase],
};

@Module(jobModuleMock)
export class JobModule {}
