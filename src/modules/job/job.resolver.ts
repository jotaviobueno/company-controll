import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateJobInput,
  IdInput,
  PaginationOptionsInput,
  UpdateJobInput,
} from 'src/domain/dtos';
import { JobEntity } from 'src/domain/entities';
import {
  JobCreateUseCase,
  JobFindAllUseCase,
  JobFindOneUseCase,
  JobSoftDeleteUseCase,
  JobUpdateUseCase,
} from './use-cases';

@Resolver(() => JobEntity)
export class JobResolver {
  constructor(
    private readonly createUseCase: JobCreateUseCase,
    private readonly findAllUseCase: JobFindAllUseCase,
    private readonly findOneUseCase: JobFindOneUseCase,
    private readonly softDeleteUseCase: JobSoftDeleteUseCase,
    private readonly updateUseCase: JobUpdateUseCase,
  ) {}

  @Mutation(() => JobEntity)
  createJob(@Args('createJobInput') createJobInput: CreateJobInput) {
    return this.createUseCase.execute(createJobInput);
  }

  @Query(() => [JobEntity])
  findAllJob(
    @Args('PaginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.findAllUseCase.execute(paginationOptionsInput);
  }

  @Query(() => JobEntity)
  findOneJob(@Args('jobId') { id }: IdInput) {
    return this.findOneUseCase.execute(id);
  }

  @Mutation(() => JobEntity)
  updateJob(@Args('updateJobInput') updateJobInput: UpdateJobInput) {
    return this.updateUseCase.execute(updateJobInput);
  }

  @Mutation(() => Boolean)
  removeJob(@Args('jobId') { id }: IdInput) {
    return this.softDeleteUseCase.execute(id);
  }
}
