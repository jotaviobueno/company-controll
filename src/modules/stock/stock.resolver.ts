import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateStockInput } from 'src/domain/dtos';
import { StockEntity } from 'src/domain/entities';
import { StockCreateUseCase } from './use-cases';

@Resolver(() => StockEntity)
export class StockResolver {
  constructor(private readonly createUseCase: StockCreateUseCase) {}

  @Mutation(() => StockEntity)
  createStock(@Args('createStockInput') createStockInput: CreateStockInput) {
    return this.createUseCase.execute(createStockInput);
  }
}
