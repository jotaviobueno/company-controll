import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import {
  CreateCompanyInput,
  IdInput,
  PaginationOptionsInput,
  UpdateCompanyInput,
} from 'src/domain/dtos';
import {
  AddressEntity,
  CompanyEntity,
  PersonEntity,
} from 'src/domain/entities';
import {
  CompanyCreateUseCase,
  CompanyFindAllUseCase,
  CompanyFindOneUseCase,
  CompanySoftDeleteUseCase,
  CompanyUpdateUseCase,
} from './use-cases';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../access/guards';
import { LoaderAddressByCompanyId } from '../company-address/dataloaders';

@Resolver(() => CompanyEntity)
export class CompanyResolver {
  constructor(
    private readonly createUseCase: CompanyCreateUseCase,
    private readonly findAllUseCase: CompanyFindAllUseCase,
    private readonly findOneUseCase: CompanyFindOneUseCase,
    private readonly softDeleteUseCase: CompanySoftDeleteUseCase,
    private readonly updateUseCase: CompanyUpdateUseCase,
    private readonly loaderAddressByCompanyId: LoaderAddressByCompanyId,
  ) {}

  @Mutation(() => CompanyEntity)
  @UseGuards(AuthGuard)
  createCompany(
    @Context('person') { id }: PersonEntity,
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
  ) {
    return this.createUseCase.execute(createCompanyInput, id);
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

  @Mutation(() => Boolean)
  removeCompany(@Args('companyId') { id }: IdInput) {
    return this.softDeleteUseCase.execute(id);
  }

  @ResolveField(() => [AddressEntity], { nullable: true })
  addresses(
    @Parent()
    { id }: CompanyEntity,
  ) {
    return this.loaderAddressByCompanyId.load(id);
  }
}
