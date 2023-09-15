import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProviderAddressEntity } from 'src/domain/entities';
import {
  CreateAddressInput,
  IdInput,
  PaginationOptionsInput,
  UpdateProviderAddressInput,
} from 'src/domain/dtos';
import {
  ProviderAddressCreateUseCase,
  ProviderAddressFindAllUseCase,
  ProviderAddressFindOneUseCase,
  ProviderAddressSoftDeleteUseCase,
  ProviderAddressUpdateUseCase,
} from './use-cases';

@Resolver(() => ProviderAddressEntity)
export class ProviderAddressResolver {
  constructor(
    private readonly createUseCase: ProviderAddressCreateUseCase,
    private readonly findAllUseCase: ProviderAddressFindAllUseCase,
    private readonly findOneUseCase: ProviderAddressFindOneUseCase,
    private readonly softDeleteUseCase: ProviderAddressSoftDeleteUseCase,
    private readonly updateUseCase: ProviderAddressUpdateUseCase,
  ) {}

  @Mutation(() => ProviderAddressEntity)
  createProviderAddress(
    @Args('createProviderAddressInput')
    createAddressInput: CreateAddressInput,
    @Args('providerId') { id }: IdInput,
  ) {
    return this.createUseCase.execute({
      providerId: id,
      ...createAddressInput,
    });
  }

  @Query(() => [ProviderAddressEntity])
  findAllProviderAddress(
    @Args('paginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.findAllUseCase.execute(paginationOptionsInput);
  }

  @Query(() => ProviderAddressEntity)
  findOneProviderAddress(@Args('providerAddressId') { id }: IdInput) {
    return this.findOneUseCase.execute(id);
  }

  @Mutation(() => ProviderAddressEntity)
  updateProviderAddress(
    @Args('updateProviderAddressInput')
    updateProviderAddressInput: UpdateProviderAddressInput,
  ) {
    return this.updateUseCase.execute(updateProviderAddressInput);
  }

  @Mutation(() => ProviderAddressEntity)
  removeProviderAddress(@Args('providerAddressId') { id }: IdInput) {
    return this.softDeleteUseCase.execute(id);
  }
}
