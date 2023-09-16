import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateTeamRequestInput,
  IdInput,
  PaginationOptionsInput,
} from 'src/domain/dtos';
import { TeamRequestEntity } from 'src/domain/entities';
import {
  TeamRequestCreateUseCase,
  TeamRequestAcceptUseCase,
  TeamRequestRefusedUseCase,
  TeamRequestFindAllUseCase,
  TeamRequestCancelUseCase,
} from './use-cases';

@Resolver(() => TeamRequestEntity)
export class TeamRequestResolver {
  constructor(
    private readonly acceptUseCase: TeamRequestAcceptUseCase,
    private readonly createUseCase: TeamRequestCreateUseCase,
    private readonly refusedUseCase: TeamRequestRefusedUseCase,
    private readonly findAllUseCase: TeamRequestFindAllUseCase,
    private readonly cancelUseCase: TeamRequestCancelUseCase,
  ) {}

  @Mutation(() => TeamRequestEntity)
  createTeamRequest(
    @Args('createTeamRequestInput')
    createTeamRequestInpu: CreateTeamRequestInput,
  ) {
    return this.createUseCase.execute(createTeamRequestInpu);
  }

  @Mutation(() => TeamRequestEntity)
  acceptTeamRequest(@Args('teamRequestId') { id }: IdInput) {
    return this.acceptUseCase.execute(id);
  }

  @Mutation(() => TeamRequestEntity)
  refusedTeamRequest(@Args('teamId') { id }: IdInput) {
    return this.refusedUseCase.execute(id);
  }

  @Query(() => [TeamRequestEntity])
  findAllTeamRequest(
    @Args('paginationOptiosnInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.findAllUseCase.execute(paginationOptionsInput);
  }

  @Mutation(() => TeamRequestEntity)
  cancelTeamRequest(@Args('teamRequestId') { id }: IdInput) {
    return this.cancelUseCase.execute(id);
  }
}
