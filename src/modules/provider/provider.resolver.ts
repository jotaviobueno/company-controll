import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateProviderInput,
  IdInput,
  PaginationOptionsInput,
  UpdateProviderInput,
} from 'src/domain/dtos';
import { ProviderEntity } from 'src/domain/entities';
import {
  ProviderFindAllUseCase,
  ProviderFindOneUseCase,
  ProviderUpdateUseCase,
  ProviderSoftDeleteUseCase,
  ProviderCreateUseCase,
} from './use-cases';

@Resolver(() => ProviderEntity)
export class ProviderResolver {
  constructor(
    private readonly createUseCase: ProviderCreateUseCase,
    private readonly findAllUseCase: ProviderFindAllUseCase,
    private readonly findOneUseCase: ProviderFindOneUseCase,
    private readonly updateUseCase: ProviderUpdateUseCase,
    private readonly softDeleteUseCase: ProviderSoftDeleteUseCase,
  ) {}

  @Query(() => ProviderEntity)
  createProvivder(
    @Args('createProviderInput') createProivderInput: CreateProviderInput,
  ) {
    return this.createUseCase.execute(createProivderInput);
  }

  @Query(() => [ProviderEntity])
  findAllProvider(
    @Args('paginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.findAllUseCase.execute(paginationOptionsInput);
  }

  @Query(() => ProviderEntity)
  findOneProvider(@Args('providerId') { id }: IdInput) {
    return this.findOneUseCase.execute(id);
  }

  @Mutation(() => ProviderEntity)
  updateProvider(
    @Args('updateProviderInput') updateProviderInput: UpdateProviderInput,
  ) {
    return this.updateUseCase.execute(updateProviderInput);
  }

  @Mutation(() => ProviderEntity)
  removeProvider(@Args('providerId') { id }: IdInput) {
    return this.softDeleteUseCase.execute(id);
  }
}
