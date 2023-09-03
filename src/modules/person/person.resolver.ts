import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PersonEntity } from 'src/domain/entities';
import {
  PersonFindAllUseCase,
  PersonFindOneUseCase,
  PersonSoftDeleteUseCase,
  PersonUpdateUseCase,
} from './use-cases';
import {
  IdInput,
  PaginationOptionsInput,
  UpdatePersonInput,
} from 'src/domain/dtos';

@Resolver(() => PersonEntity)
export class PersonResolver {
  constructor(
    private readonly findAllUseCase: PersonFindAllUseCase,
    private readonly findOneUseCase: PersonFindOneUseCase,
    private readonly updateUseCase: PersonUpdateUseCase,
    private readonly softDeleteUseCase: PersonSoftDeleteUseCase,
  ) {}

  @Query(() => [PersonEntity])
  findAllPerson(
    @Args('PaginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.findAllUseCase.execute(paginationOptionsInput);
  }

  @Query(() => PersonEntity)
  findOnePerson(@Args('personId') { id }: IdInput) {
    return this.findOneUseCase.execute(id);
  }

  @Mutation(() => PersonEntity)
  updatePerson(
    @Args('updatePersonInput') updatePersonInput: UpdatePersonInput,
  ) {
    return this.updateUseCase.execute(updatePersonInput);
  }

  @Mutation(() => Boolean)
  removePerson(@Args('personId') { id }: IdInput) {
    return this.softDeleteUseCase.execute(id);
  }
}
