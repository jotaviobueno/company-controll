import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CustomerCompanyInput, IdInput } from 'src/domain/dtos';
import { CustomerCompanyEntity } from 'src/domain/entities';
import {
  CustomerCompanyCreateUseCase,
  CustomerCompanyRemoveUseCase,
} from './use-cases';

@Resolver(() => CustomerCompanyEntity)
export class CustomerCompanyResolver {
  constructor(
    private readonly customerCompanyCreateUseCase: CustomerCompanyCreateUseCase,
    private readonly customerCompanyRemoveUseCase: CustomerCompanyRemoveUseCase,
  ) {}

  @Mutation(() => CustomerCompanyEntity)
  createCustomerCompany(
    @Args('CustomerCompanyInput')
    customerCompanyInput: CustomerCompanyInput,
  ) {
    return this.customerCompanyCreateUseCase.execute(customerCompanyInput);
  }

  @Mutation(() => CustomerCompanyEntity)
  removeCustomerCompany(@Args('customerCompanyId') { id }: IdInput) {
    return this.customerCompanyRemoveUseCase.execute(id);
  }
}
