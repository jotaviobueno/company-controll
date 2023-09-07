import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateProductInput,
  IdInput,
  PaginationOptionsInput,
  UpdateProductInput,
} from 'src/domain/dtos';
import { ProductEntity } from 'src/domain/entities';
import {
  ProductCreateUseCase,
  ProductFindOneUseCase,
  ProductSoftDeleteUseCase,
  ProductUpdateUseCase,
  ProductFindAllUseCase,
} from './use-cases';

@Resolver(() => ProductEntity)
export class ProductResolver {
  constructor(
    private readonly createUseCase: ProductCreateUseCase,
    private readonly findOneUseCase: ProductFindOneUseCase,
    private readonly findAllUseCase: ProductFindAllUseCase,
    private readonly updateUseCase: ProductUpdateUseCase,
    private readonly softDeleteUseCase: ProductSoftDeleteUseCase,
  ) {}

  @Mutation(() => ProductEntity)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.createUseCase.execute(createProductInput);
  }

  @Query(() => [ProductEntity])
  findAllProduct(
    @Args('PaginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.findAllUseCase.execute(paginationOptionsInput);
  }

  @Query(() => ProductEntity)
  findOneProduct(@Args('productId') { id }: IdInput) {
    return this.findOneUseCase.execute(id);
  }

  @Mutation(() => ProductEntity)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.updateUseCase.execute(updateProductInput);
  }

  @Mutation(() => ProductEntity)
  removeProduct(@Args('productId') { id }: IdInput) {
    return this.softDeleteUseCase.execute(id);
  }
}
