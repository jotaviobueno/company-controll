import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  IdInput,
  PaginationOptionsInput,
  UpdateCategoryInput,
} from 'src/domain/dtos';
import { CategoryEntity } from 'src/domain/entities';
import {
  CategoryFindAllUseCase,
  CategoryFindOneUseCase,
  CategorySoftDeleteUseCase,
  CategoryUpdateUseCase,
} from './use-cases';

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  constructor(
    private readonly findAllUseCase: CategoryFindAllUseCase,
    private readonly findOneUseCase: CategoryFindOneUseCase,
    private readonly softDeleteUseCase: CategorySoftDeleteUseCase,
    private readonly updateUseCase: CategoryUpdateUseCase,
  ) {}

  @Query(() => [CategoryEntity])
  findAllCategory(
    @Args('PaginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.findAllUseCase.execute(paginationOptionsInput);
  }

  @Query(() => CategoryEntity)
  findOneCategory(@Args('categoryId') { id }: IdInput) {
    return this.findOneUseCase.execute(id);
  }

  @Mutation(() => CategoryEntity)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.updateUseCase.execute(updateCategoryInput);
  }

  @Mutation(() => Boolean)
  removeCategory(@Args('categoryId') { id }: IdInput) {
    return this.softDeleteUseCase.execute(id);
  }
}
