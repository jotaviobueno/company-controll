import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { createInvoiceProductDtoMock } from 'src/domain/mocks';
import { InvoiceProductCreateManyUseCase } from './invoice-product-create-many.use-case';
import { invoiceProductModuleMock } from '../../invoice-product.module';

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
      .mockResolvedValue({ count: 10 });

    const response = await usecase.execute([createInvoiceProductDtoMock]);

    expect(response).toStrictEqual({ count: 10 });
    expect(createSpy).toHaveBeenCalledWith({
      data: [createInvoiceProductDtoMock],
    });
  });
});
