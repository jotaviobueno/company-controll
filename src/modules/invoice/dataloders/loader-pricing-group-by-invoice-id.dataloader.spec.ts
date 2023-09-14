import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/db/prisma.service';
import { invoiceModuleMock } from '../invoice.module';
import { invoicePricingGroupMock, pricingGroupMock } from 'src/domain/mocks';
import { LoaderPricingGroupByInvoiceId } from './loader-pricing-group-by-invoice-id.dataloader';

describe('LoaderPricingGroupByInvoiceId', () => {
  let dataloader: LoaderPricingGroupByInvoiceId;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(invoiceModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    dataloader = moduleRef.get<LoaderPricingGroupByInvoiceId>(
      LoaderPricingGroupByInvoiceId,
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
      .spyOn(prismaService.invoicePricingGroup, 'findMany')
      .mockResolvedValue([invoicePricingGroupMock]);

    jest
      .spyOn(prismaService.pricingGroup, 'findMany')
      .mockResolvedValue([pricingGroupMock]);

    const response = await dataloader.load('1');

    expect(response).toStrictEqual([pricingGroupMock]);
  });
});
