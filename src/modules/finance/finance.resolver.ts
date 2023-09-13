import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { FinanceEntity, InvoiceEntity } from 'src/domain/entities';
import { FinanceFindAllUseCase } from './use-cases';
import { LoaderInvoiceByInvoiceId } from './dataloaders';

@Resolver(() => FinanceEntity)
export class FinanceResolver {
  constructor(
    private readonly findAllUseCase: FinanceFindAllUseCase,
    private readonly loaderInvoiceByInvoiceId: LoaderInvoiceByInvoiceId,
  ) {}

  @Query(() => [FinanceEntity])
  findAllFinances(
    @Args('paginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.findAllUseCase.execute(paginationOptionsInput);
  }

  @ResolveField(() => [InvoiceEntity], { nullable: true })
  companies(
    @Parent()
    { id }: FinanceEntity,
  ) {
    return this.loaderInvoiceByInvoiceId.load(id);
  }
}
