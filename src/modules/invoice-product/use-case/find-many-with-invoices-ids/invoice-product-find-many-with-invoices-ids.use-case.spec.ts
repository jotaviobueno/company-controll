import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { invoiceProductMock } from 'src/domain/mocks';
import { InvoiceProductFindManyWithInvoicesIdsUseCase } from './invoice-product-find-many-with-invoices-ids.use-case';
import { invoiceProductModuleMock } from '../../invoice-product.module';

describe('InvoiceProductFindManyWithInvoicesIdsUseCase', () => {
  let usecase: InvoiceProductFindManyWithInvoicesIdsUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      invoiceProductModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<InvoiceProductFindManyWithInvoicesIdsUseCase>(
      InvoiceProductFindManyWithInvoicesIdsUseCase,
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
      .spyOn(prismaService.invoiceProduct, 'findMany')
      .mockResolvedValue([invoiceProductMock]);

    const response = await usecase.execute(['1']);

    expect(response).toStrictEqual([invoiceProductMock]);
    expect(findManySpy).toHaveBeenCalledWith({
      where: {
        invoiceId: {
          in: ['1'],
        },
      },
    });
  });
});
