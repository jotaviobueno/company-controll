import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CustomerAddressEntity } from 'src/domain/entities';
import {
  CreateAddressInput,
  IdInput,
  PaginationOptionsInput,
  UpdateCustomerAddressInput,
} from 'src/domain/dtos';
import {
  CustomerAddressCreateUseCase,
  CustomerAddressFindAllUseCase,
  CustomerAddressFindOneUseCase,
  CustomerAddressSoftDeleteUseCase,
  CustomerAddressUpdateUseCase,
} from './use-cases';

@Resolver(() => CustomerAddressEntity)
export class CustomerAddressResolver {
  constructor(
    private readonly createUseCase: CustomerAddressCreateUseCase,
    private readonly findAllUseCase: CustomerAddressFindAllUseCase,
    private readonly findOneUseCase: CustomerAddressFindOneUseCase,
    private readonly softDeleteUseCase: CustomerAddressSoftDeleteUseCase,
    private readonly updateUseCase: CustomerAddressUpdateUseCase,
  ) {}

  @Mutation(() => CustomerAddressEntity)
  createCustomerAddress(
    @Args('createCustomerAddressInput')
    createAddressInput: CreateAddressInput,
    @Args('customerId') { id }: IdInput,
  ) {
    return this.createUseCase.execute({
      customerId: id,
      ...createAddressInput,
    });
  }

  @Query(() => [CustomerAddressEntity])
  findAllCustomerAddress(
    @Args('paginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.findAllUseCase.execute(paginationOptionsInput);
  }

  @Query(() => CustomerAddressEntity)
  findOneCustomerAddress(@Args('customerAddressId') { id }: IdInput) {
    return this.findOneUseCase.execute(id);
  }

  @Mutation(() => CustomerAddressEntity)
  updateCustomerAddress(
    @Args('updateCustomerAddressInput')
    updateCustomerAddressInput: UpdateCustomerAddressInput,
  ) {
    return this.updateUseCase.execute(updateCustomerAddressInput);
  }

  @Mutation(() => CustomerAddressEntity)
  removeCustomerAddress(@Args('customerAddressId') { id }: IdInput) {
    return this.softDeleteUseCase.execute(id);
  }
}
