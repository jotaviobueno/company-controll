import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { IdInput, PaginationOptionsInput } from 'src/domain/dtos';
import { CreateAddressInput } from 'src/domain/dtos';
import { AddressEntity, PersonAddressEntity } from 'src/domain/entities';
import {
  PersonAddressCreateUseCase,
  PersonAddressFindAllUseCase,
  PersonAddressFindOneUseCase,
  PersonAddressSoftDeleteUseCase,
  PersonAddressUpdateUseCase,
} from './use-cases';

@Resolver(() => PersonAddressEntity)
export class PersonAddressResolver {
  constructor(
    private readonly createUseCase: PersonAddressCreateUseCase,
    private readonly updateUseCase: PersonAddressUpdateUseCase,
    private readonly findAllUseCase: PersonAddressFindAllUseCase,
    private readonly findOneUseCase: PersonAddressFindOneUseCase,
    private readonly softDeleteUseCase: PersonAddressSoftDeleteUseCase,
  ) {}

  @Mutation(() => PersonAddressEntity)
  createPersonAddress(
    @Args('personId') { id }: IdInput,
    @Args('createAddressInput') createAddressInput: CreateAddressInput,
  ) {
    return this.createUseCase.execute({
      personId: id,
      ...createAddressInput,
    });
  }

  @Query(() => [PersonAddressEntity])
  findAllPersonAddress(
    @Args('PaginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.findAllUseCase.execute(paginationOptionsInput);
  }

  @Query(() => PersonAddressEntity)
  findOnePersonAddress(@Args('personAddressId') { id }: IdInput) {
    return this.findOneUseCase.execute(id);
  }

  @Mutation(() => PersonAddressEntity)
  updatePersonAddress(
    @Args('companyId') { id }: IdInput,
    @Args('updateAddressInput') updateAddressInput: CreateAddressInput,
  ) {
    return this.updateUseCase.execute({ id, ...updateAddressInput });
  }

  @Mutation(() => PersonAddressEntity)
  removePersonAddress(@Args('personAddressId') { id }: IdInput) {
    return this.softDeleteUseCase.execute(id);
  }
}
