import { Test, TestingModule } from '@nestjs/testing';
import { LoaderCompanyByInvoiceId } from './loader-company-by-invoice-id.dataloader';
import { PrismaService } from 'src/db/prisma.service';
import { invoiceModuleMock } from '../invoice.module';
import { companyMock, invoiceCompanyMock } from 'src/domain/mocks';

describe('LoaderCompanyByInvoiceId', () => {
  let dataloader: LoaderCompanyByInvoiceId;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(invoiceModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    dataloader = moduleRef.get<LoaderCompanyByInvoiceId>(
      LoaderCompanyByInvoiceId,
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
      .spyOn(prismaService.invoiceCompany, 'findMany')
      .mockResolvedValue([invoiceCompanyMock]);

    jest
      .spyOn(prismaService.company, 'findMany')
      .mockResolvedValue([companyMock]);

    const response = await dataloader.load('1');

    expect(response).toStrictEqual([companyMock]);
  });
});
