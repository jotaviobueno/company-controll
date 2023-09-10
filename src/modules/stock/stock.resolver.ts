import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateStockInput } from 'src/domain/dtos';
import { StockEntity } from 'src/domain/entities';
import { StockHandlerUseCase } from './use-cases';

@Resolver(() => StockEntity)
export class StockResolver {
  constructor(private readonly stockHandler: StockHandlerUseCase) {}

  @Mutation(() => StockEntity)
  createStock(@Args('createStockInput') createStockInput: CreateStockInput) {
    return this.stockHandler.execute(createStockInput);
  }
}
