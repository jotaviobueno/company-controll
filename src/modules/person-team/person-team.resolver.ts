import { Resolver, Query, Args } from '@nestjs/graphql';
import { PersonTeamEntity } from 'src/domain/entities';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { PersonTeamFindAllUseCase } from './use-cases';

@Resolver(() => PersonTeamEntity)
export class PersonTeamResolver {
  constructor(private readonly findAllUseCase: PersonTeamFindAllUseCase) {}

  @Query(() => [PersonTeamEntity])
  findAllPersonTeam(
    @Args('paginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.findAllUseCase.execute(paginationOptionsInput);
  }
}
