import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreatePricingGroupInput,
  IdInput,
  PaginationOptionsInput,
  UpdatePricingGroupInput,
} from 'src/domain/dtos';
import { PricingGroupEntity } from 'src/domain/entities';
import {
  PricingGroupCreateUseCase,
  PricingGroupFindAllUseCase,
  PricingGroupFindOneUseCase,
  PricingGroupSoftDeleteUseCase,
  PricingGroupUpdateUseCase,
} from './use-cases';

@Resolver(() => PricingGroupEntity)
export class PricingGroupResolver {
  constructor(
    private readonly createUseCase: PricingGroupCreateUseCase,
    private readonly findAllUseCase: PricingGroupFindAllUseCase,
    private readonly findOneUseCase: PricingGroupFindOneUseCase,
    private readonly softDeleteUseCase: PricingGroupSoftDeleteUseCase,
    private readonly updateUseCase: PricingGroupUpdateUseCase,
  ) {}

  @Mutation(() => PricingGroupEntity)
  createPricingGroup(
    @Args('createPricingGroupInput')
    createPricingGroupInput: CreatePricingGroupInput,
  ) {
    return this.createUseCase.execute(createPricingGroupInput);
  }

  @Query(() => [PricingGroupEntity])
  findAllPricingGroup(
    @Args('PaginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.findAllUseCase.execute(paginationOptionsInput);
  }

  @Query(() => PricingGroupEntity)
  findOnePricingGroup(@Args('pricingGroupId') { id }: IdInput) {
    return this.findOneUseCase.execute(id);
  }

  @Mutation(() => PricingGroupEntity)
  updatePricingGroup(
    @Args('updatePricingGroupInput')
    updatePricingGroupInput: UpdatePricingGroupInput,
  ) {
    return this.updateUseCase.execute(updatePricingGroupInput);
  }

  @Mutation(() => Boolean)
  removePricingGroup(@Args('pricingGroupId') { id }: IdInput) {
    return this.softDeleteUseCase.execute(id);
  }
}
