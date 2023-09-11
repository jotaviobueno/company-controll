import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { InvoiceCustomerFindManyWithInvoicesIdsUseCase } from './invoice-customer-find-many-with-invoices-ids.use-case';
import { invoiceCustomerModuleMock } from '../../invoice-customer.module';
import { invoiceCustomerMock } from 'src/domain/mocks';

describe('InvoiceCustomerFindManyWithInvoicesIdsUseCase', () => {
  let usecase: InvoiceCustomerFindManyWithInvoicesIdsUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      invoiceCustomerModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<InvoiceCustomerFindManyWithInvoicesIdsUseCase>(
      InvoiceCustomerFindManyWithInvoicesIdsUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should findMany', async () => {
    const findManySpy = jest
      .spyOn(prismaService.invoiceCustomer, 'findMany')
      .mockResolvedValue([invoiceCustomerMock]);

    const response = await usecase.execute(['1']);

    expect(response).toStrictEqual([invoiceCustomerMock]);
    expect(findManySpy).toHaveBeenCalledWith({
      where: {
        invoiceId: {
          in: ['1'],
        },
      },
    });
  });
});
