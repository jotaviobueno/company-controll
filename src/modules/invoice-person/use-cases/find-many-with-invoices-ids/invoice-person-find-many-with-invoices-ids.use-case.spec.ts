import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { InvoicePersonFindManyWithInvoicesIdsUseCase } from './invoice-person-find-many-with-invoices-ids.use-case';
import { invoicePersonModuleMock } from '../../invoice-person.module';
import { invoicePersonMock } from 'src/domain/mocks';

describe('InvoicePersonFindManyWithInvoicesIdsUseCase', () => {
  let usecase: InvoicePersonFindManyWithInvoicesIdsUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      invoicePersonModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<InvoicePersonFindManyWithInvoicesIdsUseCase>(
      InvoicePersonFindManyWithInvoicesIdsUseCase,
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
      .spyOn(prismaService.invoicePerson, 'findMany')
      .mockResolvedValue([invoicePersonMock]);

    const response = await usecase.execute(['1']);

    expect(response).toStrictEqual([invoicePersonMock]);
    expect(findManySpy).toHaveBeenCalledWith({
      where: {
        invoiceId: {
          in: ['1'],
        },
      },
    });
  });
});
