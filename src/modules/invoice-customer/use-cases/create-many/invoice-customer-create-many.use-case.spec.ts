import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { InvoiceCustomerCreateManyUseCase } from './invoice-customer-create-many.use-case';
import { invoiceCustomerModuleMock } from '../../invoice-customer.module';
import { createInvoiceCustomerDtoMock } from 'src/domain/mocks';
import { createManyMock } from 'src/domain/mocks/shared';

describe('InvoiceCustomerCreateManyUseCase', () => {
  let usecase: InvoiceCustomerCreateManyUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      invoiceCustomerModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<InvoiceCustomerCreateManyUseCase>(
      InvoiceCustomerCreateManyUseCase,
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
      .spyOn(prismaService.invoiceCustomer, 'createMany')
      .mockResolvedValue(createManyMock);

    const response = await usecase.execute([createInvoiceCustomerDtoMock]);

    expect(response).toStrictEqual(createManyMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: [createInvoiceCustomerDtoMock],
    });
  });
});
