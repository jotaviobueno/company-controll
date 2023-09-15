import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/db/prisma.service';
import { invoiceModuleMock } from '../invoice.module';
import { customerMock, invoiceCustomerMock } from 'src/domain/mocks';
import { LoaderCustomerByInvoiceId } from './loader-customer-by-invoice-id.dataloader';

describe('LoaderCustomerByInvoiceId', () => {
  let dataloader: LoaderCustomerByInvoiceId;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(invoiceModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    dataloader = moduleRef.get<LoaderCustomerByInvoiceId>(
      LoaderCustomerByInvoiceId,
    );
  });

  it('should be defined', () => {
    expect(dataloader).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should create', async () => {
    jest
      .spyOn(prismaService.invoiceCustomer, 'findMany')
      .mockResolvedValue([invoiceCustomerMock]);

    jest
      .spyOn(prismaService.customer, 'findMany')
      .mockResolvedValue([customerMock]);

    const response = await dataloader.load('1');

    expect(response).toStrictEqual([customerMock]);
  });
});
