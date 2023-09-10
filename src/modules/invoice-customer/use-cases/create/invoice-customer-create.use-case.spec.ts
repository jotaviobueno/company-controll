import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { InvoiceCustomerCreateUseCase } from './invoice-customer-create.use-case';
import { invoiceCustomerModuleMock } from '../../invoice-customer.module';
import {
  createInvoiceCustomerDtoMock,
  invoiceCustomerMock,
} from 'src/domain/mocks';

describe('InvoiceCustomerCreateUseCase', () => {
  let usecase: InvoiceCustomerCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      invoiceCustomerModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<InvoiceCustomerCreateUseCase>(
      InvoiceCustomerCreateUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should create', async () => {
    const createSpy = jest
      .spyOn(prismaService.invoiceCustomer, 'create')
      .mockResolvedValue(invoiceCustomerMock);

    const response = await usecase.execute(createInvoiceCustomerDtoMock);

    expect(response).toStrictEqual(invoiceCustomerMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createInvoiceCustomerDtoMock,
      },
    });
  });
});
