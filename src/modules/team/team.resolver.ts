import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TeamEntity } from 'src/domain/entities';
import { CreateTeamInput, UpdateTeamInput } from 'src/domain/dtos/team';
import { IdInput, PaginationOptionsInput } from 'src/domain/dtos';
import {
  TeamCreateUseCase,
  TeamFindAllUseCase,
  TeamFindOneUseCase,
  TeamSoftDeleteUseCase,
  TeamUpdateUseCase,
} from './use-cases';

@Resolver(() => TeamEntity)
export class TeamResolver {
  constructor(
    private readonly createUseCase: TeamCreateUseCase,
    private readonly findOneUseCase: TeamFindOneUseCase,
    private readonly softDeleteUseCase: TeamSoftDeleteUseCase,
    private readonly updateUseCase: TeamUpdateUseCase,
    private readonly findAllUseCase: TeamFindAllUseCase,
  ) {}

  @Mutation(() => TeamEntity)
  createTeam(@Args('createTeamInput') createTeamInput: CreateTeamInput) {
    return this.createUseCase.execute(createTeamInput);
  }

  @Query(() => TeamEntity)
  findOneTeam(@Args('teamId') { id }: IdInput) {
    return this.findOneUseCase.execute(id);
  }

  @Query(() => [TeamEntity])
  findAllTeam(
    @Args('paginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.findAllUseCase.execute(paginationOptionsInput);
  }

  @Mutation(() => TeamEntity)
  updateTeam(@Args('updateTeam') updateTeamInput: UpdateTeamInput) {
    return this.updateUseCase.execute(updateTeamInput);
  }

  @Mutation(() => Boolean)
  removeTeam(@Args('teamId') { id }: IdInput) {
    return this.softDeleteUseCase.execute(id);
  }
}
