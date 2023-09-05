import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateAddressInput,
  IdInput,
  PaginationOptionsInput,
} from 'src/domain/dtos';
import { CompanyAddressEntity } from 'src/domain/entities';
import {
  CompanyAddressCreateUseCase,
  CompanyAddressFindAllUseCase,
  CompanyAddressFindOneUseCase,
  CompanyAddressSoftDeleteUseCase,
  CompanyAddressUpdateUseCase,
} from './use-cases';

@Resolver(() => CompanyAddressEntity)
export class CompanyAddressResolver {
  constructor(
    private readonly createUseCase: CompanyAddressCreateUseCase,
    private readonly findAllUseCase: CompanyAddressFindAllUseCase,
    private readonly findOneUseCase: CompanyAddressFindOneUseCase,
    private readonly updateUseCase: CompanyAddressUpdateUseCase,
    private readonly softDeleteUseCase: CompanyAddressSoftDeleteUseCase,
  ) {}

  @Mutation(() => CompanyAddressEntity)
  createCompanyAddress(
    @Args('companyId') { id }: IdInput,
    @Args('createAddressInput') createAddressInput: CreateAddressInput,
  ) {
    return this.createUseCase.execute({
      companyId: id,
      ...createAddressInput,
    });
  }

  @Query(() => [CompanyAddressEntity])
  findAllCompanyAddress(
    @Args('PaginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.findAllUseCase.execute(paginationOptionsInput);
  }

  @Query(() => CompanyAddressEntity)
  findOneCompanyAddress(@Args('companyAddressId') { id }: IdInput) {
    return this.findOneUseCase.execute(id);
  }

  @Mutation(() => CompanyAddressEntity)
  updateCompanyAddress(
    @Args('companyId') { id }: IdInput,
    @Args('updateAddressInput') updateAddressInput: CreateAddressInput,
  ) {
    return this.updateUseCase.execute({ id, ...updateAddressInput });
  }

  @Mutation(() => Boolean)
  removeCompanyAddress(@Args('companyAddressId') { id }: IdInput) {
    return this.softDeleteUseCase.execute(id);
  }
}
