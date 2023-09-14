import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/db/prisma.service';
import { invoiceModuleMock } from '../invoice.module';
import { invoicePersonMock, personMock } from 'src/domain/mocks';
import { LoaderPersonByInvoiceId } from './loader-person-by-invoice-id.dataloader';

describe('LoaderPersonByInvoiceId', () => {
  let dataloader: LoaderPersonByInvoiceId;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(invoiceModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    dataloader = moduleRef.get<LoaderPersonByInvoiceId>(
      LoaderPersonByInvoiceId,
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
      .spyOn(prismaService.invoicePerson, 'findMany')
      .mockResolvedValue([invoicePersonMock]);

    jest
      .spyOn(prismaService.person, 'findMany')
      .mockResolvedValue([personMock]);

    const response = await dataloader.load('1');

    expect(response).toStrictEqual([personMock]);
  });
});
