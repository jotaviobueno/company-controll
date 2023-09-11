import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { invoiceCompanyMock } from 'src/domain/mocks';
import { invoiceCompanyModuleMock } from '../../invoice-company.module';
import { InvoiceCompanyFindManyWithInvoicesIdsUseCase } from './invoice-company-find-many-with-invoices-ids.use-case';

describe('InvoiceCompanyFindManyWithInvoicesIdsUseCase', () => {
  let usecase: InvoiceCompanyFindManyWithInvoicesIdsUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      invoiceCompanyModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<InvoiceCompanyFindManyWithInvoicesIdsUseCase>(
      InvoiceCompanyFindManyWithInvoicesIdsUseCase,
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
      .spyOn(prismaService.invoiceCompany, 'findMany')
      .mockResolvedValue([invoiceCompanyMock]);

    const response = await usecase.execute(['1']);

    expect(response).toStrictEqual([invoiceCompanyMock]);
    expect(findManySpy).toHaveBeenCalledWith({
      where: {
        invoiceId: {
          in: ['1'],
        },
      },
    });
  });
});
