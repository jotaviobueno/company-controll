import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/db/prisma.service';
import { invoiceMock } from 'src/domain/mocks';
import { LoaderInvoiceByInvoiceId } from './loader-invoice-by-invoice-id.dataloader';
import { invoiceModuleMock } from 'src/modules/invoice/invoice.module';

describe('LoaderInvoiceByInvoiceId', () => {
  let dataloader: LoaderInvoiceByInvoiceId;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(invoiceModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    dataloader = moduleRef.get<LoaderInvoiceByInvoiceId>(
      LoaderInvoiceByInvoiceId,
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
      .spyOn(prismaService.invoice, 'findMany')
      .mockResolvedValue([invoiceMock]);

    const response = await dataloader.load('1');

    expect(response).toStrictEqual([invoiceMock]);
  });
});
