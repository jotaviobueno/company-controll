import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/db/prisma.service';
import { invoiceModuleMock } from '../invoice.module';
import { invoiceProviderMock, providerMock } from 'src/domain/mocks';
import { LoaderProviderByInvoiceId } from './loader-provider-by-invoice-id.dataloader';

describe('LoaderProviderByInvoiceId', () => {
  let dataloader: LoaderProviderByInvoiceId;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(invoiceModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    dataloader = moduleRef.get<LoaderProviderByInvoiceId>(
      LoaderProviderByInvoiceId,
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
      .spyOn(prismaService.invoiceProvider, 'findMany')
      .mockResolvedValue([invoiceProviderMock]);

    jest
      .spyOn(prismaService.provider, 'findMany')
      .mockResolvedValue([providerMock]);

    const response = await dataloader.load('1');

    expect(response).toStrictEqual([providerMock]);
  });
});
