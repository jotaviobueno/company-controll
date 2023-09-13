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
  PaymentEntity,
  PersonEntity,
  PricingGroupEntity,
  ProductEntity,
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
  LoaderPaymentByInvoiceId,
  LoaderPersonByInvoiceId,
  LoaderPricingGroupByInvoiceId,
  LoaderProductByInvoiceId,
} from './dataloders';

@Resolver(() => InvoiceEntity)
export class InvoiceResolver {
  constructor(
    private readonly invoiceCreateUseCase: InvoiceCreateUseCase,
    private readonly invoiceFindAllUseCase: InvoiceFindAllUseCase,
    private readonly invoiceFindOneUseCase: InvoiceFindOneUseCase,
    private readonly loaderCompanyByInvoiceId: LoaderCompanyByInvoiceId,
    private readonly loaderCustomerByInvoiceId: LoaderCustomerByInvoiceId,
    private readonly loaderPersonByInvoiceId: LoaderPersonByInvoiceId,
    private readonly loaderPricingGroupByInvoiceId: LoaderPricingGroupByInvoiceId,
    private readonly loaderProductByInvoiceId: LoaderProductByInvoiceId,
    private readonly loaderPaymentByInvoiceId: LoaderPaymentByInvoiceId,
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

  @ResolveField(() => [PersonEntity], { nullable: true })
  persons(
    @Parent()
    { id }: InvoiceEntity,
  ) {
    return this.loaderPersonByInvoiceId.load(id);
  }

  @ResolveField(() => [PricingGroupEntity], { nullable: true })
  pricingGroups(
    @Parent()
    { id }: InvoiceEntity,
  ) {
    return this.loaderPricingGroupByInvoiceId.load(id);
  }

  @ResolveField(() => [ProductEntity], { nullable: true })
  products(
    @Parent()
    { id }: InvoiceEntity,
  ) {
    return this.loaderProductByInvoiceId.load(id);
  }

  @ResolveField(() => [PaymentEntity], { nullable: true })
  payment(
    @Parent()
    { id }: InvoiceEntity,
  ) {
    return this.loaderPaymentByInvoiceId.load(id);
  }
}
