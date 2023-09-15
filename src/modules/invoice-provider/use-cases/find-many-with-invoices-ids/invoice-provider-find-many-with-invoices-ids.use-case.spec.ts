import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { invoiceProviderMock } from 'src/domain/mocks';
import { InvoiceProviderFindManyWithInvoicesIdsUseCase } from './invoice-provider-find-many-with-invoices-ids.use-case';
import { invoiceProviderModuleMock } from '../../invoice-provider.module';

describe('InvoiceProviderFindManyWithInvoicesIdsUseCase', () => {
  let usecase: InvoiceProviderFindManyWithInvoicesIdsUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      invoiceProviderModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<InvoiceProviderFindManyWithInvoicesIdsUseCase>(
      InvoiceProviderFindManyWithInvoicesIdsUseCase,
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
      .spyOn(prismaService.invoiceProvider, 'findMany')
      .mockResolvedValue([invoiceProviderMock]);

    const response = await usecase.execute(['1']);

    expect(response).toStrictEqual([invoiceProviderMock]);
    expect(findManySpy).toHaveBeenCalledWith({
      where: {
        invoiceId: {
          in: ['1'],
        },
      },
    });
  });
});
