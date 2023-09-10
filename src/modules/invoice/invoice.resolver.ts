import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InvoiceEntity } from 'src/domain/entities';
import {
  InvoiceCreateUseCase,
  InvoiceFindAllUseCase,
  InvoiceFindOneUseCase,
} from './use-cases';
import {
  CreateInvoiceInput,
  IdInput,
  PaginationOptionsInput,
} from 'src/domain/dtos';

@Resolver(() => InvoiceEntity)
export class InvoiceResolver {
  constructor(
    private readonly invoiceCreateUseCase: InvoiceCreateUseCase,
    private readonly invoiceFindAllUseCase: InvoiceFindAllUseCase,
    private readonly invoiceFindOneUseCase: InvoiceFindOneUseCase,
  ) {}

  @Mutation(() => InvoiceEntity)
  createInvoice(
    @Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput,
  ) {
    return this.invoiceCreateUseCase.execute(createInvoiceInput);
  }

  @Query(() => [InvoiceEntity])
  findAll(
    @Args('paginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.invoiceFindAllUseCase.execute(paginationOptionsInput);
  }

  @Query(() => InvoiceEntity)
  findOne(@Args('invoiceId') { id }: IdInput) {
    return this.invoiceFindOneUseCase.execute(id);
  }
}
