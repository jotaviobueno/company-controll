import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateProviderInput, IdInput } from 'src/domain/dtos';
import { CompanyProviderEntity } from 'src/domain/entities';
import { CompanyProviderCreateUseCase } from './use-cases';

@Resolver(() => CompanyProviderEntity)
export class CompanyProviderResolver {
  constructor(
    private readonly companyProviderCreateUseCase: CompanyProviderCreateUseCase,
  ) {}

  @Mutation(() => CompanyProviderEntity)
  createCompanyProvider(
    @Args('companyId') { id }: IdInput,
    @Args('createProviderInput') createProviderInput: CreateProviderInput,
  ) {
    return this.companyProviderCreateUseCase.execute({
      companyId: id,
      ...createProviderInput,
    });
  }
}
