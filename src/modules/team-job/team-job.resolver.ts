import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateTeamJobInput,
  IdInput,
  PaginationOptionsInput,
} from 'src/domain/dtos';
import { TeamJobEntity } from 'src/domain/entities';
import {
  TeamJobCreateUseCase,
  TeamJobFindAllUseCase,
  TeamJobSoftDeleteUseCase,
} from './use-cases';

@Resolver(() => TeamJobEntity)
export class TeamJobResolver {
  constructor(
    private readonly createUseCase: TeamJobCreateUseCase,
    private readonly findAllUseCase: TeamJobFindAllUseCase,
    private readonly softDeleteUseCase: TeamJobSoftDeleteUseCase,
  ) {}

  @Mutation(() => TeamJobEntity)
  createTeamJob(
    @Args('createTeamJobInput') createTeamJobInput: CreateTeamJobInput,
  ) {
    return this.createUseCase.execute(createTeamJobInput);
  }

  @Query(() => [TeamJobEntity])
  findAllTeamJob(
    @Args('PaginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.findAllUseCase.execute(paginationOptionsInput);
  }

  @Mutation(() => TeamJobEntity)
  removeTeamJob(@Args('teamJobId') { id }: IdInput) {
    return this.softDeleteUseCase.execute(id);
  }
}
