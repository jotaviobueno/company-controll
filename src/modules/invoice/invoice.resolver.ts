import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import {
  CompanyEntity,
  CustomerEntity,
  InvoiceEntity,
} from 'src/domain/entities';
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
import {
  LoaderCompanyByInvoiceId,
  LoaderCustomerByInvoiceId,
} from './dataloders';

@Resolver(() => InvoiceEntity)
export class InvoiceResolver {
  constructor(
    private readonly invoiceCreateUseCase: InvoiceCreateUseCase,
    private readonly invoiceFindAllUseCase: InvoiceFindAllUseCase,
    private readonly invoiceFindOneUseCase: InvoiceFindOneUseCase,
    private readonly loaderCompanyByInvoiceId: LoaderCompanyByInvoiceId,
    private readonly loaderCustomerByInvoiceId: LoaderCustomerByInvoiceId,
  ) {}

  @Mutation(() => InvoiceEntity)
  createInvoice(
    @Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput,
  ) {
    return this.invoiceCreateUseCase.execute(createInvoiceInput);
  }

  @Query(() => [InvoiceEntity])
  findAllInvoice(
    @Args('paginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.invoiceFindAllUseCase.execute(paginationOptionsInput);
  }

  @Query(() => InvoiceEntity)
  findOneInvoice(@Args('invoiceId') { id }: IdInput) {
    return this.invoiceFindOneUseCase.execute(id);
  }

  @ResolveField(() => [CompanyEntity], { nullable: true })
  companies(
    @Parent()
    { id }: InvoiceEntity,
  ) {
    return this.loaderCompanyByInvoiceId.load(id);
  }

  @ResolveField(() => [CustomerEntity], { nullable: true })
  customers(
    @Parent()
    { id }: InvoiceEntity,
  ) {
    return this.loaderCustomerByInvoiceId.load(id);
  }
}
