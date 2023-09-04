import { Resolver, Query, Args } from '@nestjs/graphql';
import { PersonCompanyEntity } from 'src/domain/entities';
import {
  PersonCompanyFindAllUseCase,
  PersonCompanyFindOneUseCase,
} from './use-cases';
import { IdInput, PaginationOptionsInput } from 'src/domain/dtos';

@Resolver(() => PersonCompanyEntity)
export class PersonCompanyResolver {
  constructor(
    private readonly findAllUseCase: PersonCompanyFindAllUseCase,
    private readonly findOneUseCase: PersonCompanyFindOneUseCase,
  ) {}

  @Query(() => [PersonCompanyEntity])
  findAllPersonCompany(
    @Args('PaginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.findAllUseCase.execute(paginationOptionsInput);
  }

  @Query(() => PersonCompanyEntity)
  findOnePersonCompany(@Args('personCompanyId') { id }: IdInput) {
    return this.findOneUseCase.execute(id);
  }
}
