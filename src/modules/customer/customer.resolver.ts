import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  IdInput,
  PaginationOptionsInput,
  UpdateCustomerInput,
} from 'src/domain/dtos';
import { CustomerEntity } from 'src/domain/entities';
import {
  CustomerFindAllUseCase,
  CustomerFindOneUseCase,
  CustomerSoftDeleteUseCase,
  CustomerUpdateUseCase,
} from './use-cases';

@Resolver(() => CustomerEntity)
export class CustomerResolver {
  constructor(
    private readonly findAllUseCase: CustomerFindAllUseCase,
    private readonly findOneUseCase: CustomerFindOneUseCase,
    private readonly updateUseCase: CustomerUpdateUseCase,
    private readonly softDeleteUseCase: CustomerSoftDeleteUseCase,
  ) {}

  @Query(() => [CustomerEntity])
  findAllCustomer(
    @Args('PaginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.findAllUseCase.execute(paginationOptionsInput);
  }

  @Query(() => CustomerEntity)
  findOneCustomer(@Args('customerId') { id }: IdInput) {
    return this.findOneUseCase.execute(id);
  }

  @Mutation(() => CustomerEntity)
  updateCustomer(
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  ) {
    return this.updateUseCase.execute(updateCustomerInput);
  }

  @Mutation(() => CustomerEntity)
  removeCustomer(@Args('customerId') { id }: IdInput) {
    return this.softDeleteUseCase.execute(id);
  }
}
