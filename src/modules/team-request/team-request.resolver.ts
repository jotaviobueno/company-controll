import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TeamRequestService } from './team-request.service';
import { TeamRequestSchema } from '../../domain/models';
import {
  IdInput,
  PaginationOptionsInput,
  SearchTeamRequestInput,
} from '../../domain/dtos';

@Resolver(() => TeamRequestSchema)
export class TeamRequestResolver {
  constructor(private readonly teamRequestService: TeamRequestService) {}

  @Mutation(() => TeamRequestSchema)
  acceptTeamRequest(@Args('teamRequestId') { id }: IdInput) {
    return this.teamRequestService.acceptTeamRequest(id);
  }

  @Mutation(() => TeamRequestSchema)
  refusedTeamRequest(@Args('teamId') { id }: IdInput) {
    return this.teamRequestService.refusedTeamRequest(id);
  }

  @Query(() => [TeamRequestSchema])
  findAll(
    @Args('searchTeamRequest') searchTeamRequestInput: SearchTeamRequestInput,
    @Args('paginationOptiosnInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.teamRequestService.findAll(
      searchTeamRequestInput,
      paginationOptionsInput,
    );
  }

  @Mutation(() => TeamRequestSchema)
  cancelTeamRequest(@Args('teamRequestId') { id }: IdInput) {
    return this.teamRequestService.cancel(id);
  }
}
