import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateCompanyInput,
  IdInput,
  PaginationOptionsInput,
  UpdateCompanyInput,
} from 'src/domain/dtos';
import { CompanyEntity } from 'src/domain/entities';
import {
  CompanyCreateUseCase,
  CompanyFindAllUseCase,
  CompanyFindOneUseCase,
  CompanySoftDeleteUseCase,
  CompanyUpdateUseCase,
} from './use-cases';

@Resolver(() => CompanyEntity)
export class CompanyResolver {
  constructor(
    private readonly createUseCase: CompanyCreateUseCase,
    private readonly findAllUseCase: CompanyFindAllUseCase,
    private readonly findOneUseCase: CompanyFindOneUseCase,
    private readonly softDeleteUseCase: CompanySoftDeleteUseCase,
    private readonly updateUseCase: CompanyUpdateUseCase,
  ) {}

  @Mutation(() => CompanyEntity)
  createCompany(
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
  ) {
    return this.createUseCase.execute(createCompanyInput);
  }

  @Query(() => [CompanyEntity])
  findAllCompany(
    @Args('paginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.findAllUseCase.execute(paginationOptionsInput);
  }

  @Query(() => CompanyEntity)
  findOneCompany(@Args('companyId') { id }: IdInput) {
    return this.findOneUseCase.execute(id);
  }

  @Mutation(() => CompanyEntity)
  updateCompany(
    @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput,
  ) {
    return this.updateUseCase.execute(updateCompanyInput);
  }

  @Mutation(() => CompanyEntity)
  removeCompany(@Args('companyId') { id }: IdInput) {
    return this.softDeleteUseCase.execute(id);
  }
}
