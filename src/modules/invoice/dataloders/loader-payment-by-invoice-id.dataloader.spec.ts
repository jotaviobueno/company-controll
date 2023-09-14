import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/db/prisma.service';
import { invoiceModuleMock } from '../invoice.module';
import { paymentMock } from 'src/domain/mocks';
import { LoaderPaymentByInvoiceId } from './loader-payment-by-invoice-id.dataloader';

describe('LoaderPaymentByInvoiceId', () => {
  let dataloader: LoaderPaymentByInvoiceId;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(invoiceModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    dataloader = moduleRef.get<LoaderPaymentByInvoiceId>(
      LoaderPaymentByInvoiceId,
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
      .spyOn(prismaService.payment, 'findMany')
      .mockResolvedValue([paymentMock]);

    const response = await dataloader.load('1');

    expect(response).toStrictEqual([paymentMock]);
  });
});
