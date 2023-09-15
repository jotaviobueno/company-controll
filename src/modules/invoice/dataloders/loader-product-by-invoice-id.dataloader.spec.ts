import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/db/prisma.service';
import { invoiceModuleMock } from '../invoice.module';
import { invoiceProductMock, productMock } from 'src/domain/mocks';
import { LoaderProductByInvoiceId } from './loader-product-by-invoice-id.dataloader';

describe('LoaderProductByInvoiceId', () => {
  let dataloader: LoaderProductByInvoiceId;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(invoiceModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    dataloader = moduleRef.get<LoaderProductByInvoiceId>(
      LoaderProductByInvoiceId,
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
      .spyOn(prismaService.invoiceProduct, 'findMany')
      .mockResolvedValue([invoiceProductMock]);

    jest
      .spyOn(prismaService.product, 'findMany')
      .mockResolvedValue([productMock]);

    const response = await dataloader.load('1');

    expect(response).toStrictEqual([productMock]);
  });
});
