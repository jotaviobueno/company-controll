import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { createInvoiceProductDtoMock } from 'src/domain/mocks';
import { InvoiceProductCreateManyUseCase } from './invoice-product-create-many.use-case';
import { invoiceProductModuleMock } from '../../invoice-product.module';
import { createManyMock } from 'src/domain/mocks/shared';

describe('InvoiceProductCreateManyUseCase', () => {
  let usecase: InvoiceProductCreateManyUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      invoiceProductModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<InvoiceProductCreateManyUseCase>(
      InvoiceProductCreateManyUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should create', async () => {
    const createSpy = jest
      .spyOn(prismaService.invoiceProduct, 'createMany')
      .mockResolvedValue(createManyMock);

    const response = await usecase.execute([createInvoiceProductDtoMock]);

    expect(response).toStrictEqual(createManyMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: [createInvoiceProductDtoMock],
    });
  });
});
