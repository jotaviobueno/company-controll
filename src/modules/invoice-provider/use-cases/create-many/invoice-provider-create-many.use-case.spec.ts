import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { createInvoiceProviderInputMock } from 'src/domain/mocks';
import { InvoiceProviderCreateManyUseCase } from './invoice-provider-create-many.use-case';
import { invoiceProviderModuleMock } from '../../invoice-provider.module';
import { createManyMock } from 'src/domain/mocks/shared';

describe('InvoiceProviderCreateManyUseCase', () => {
  let usecase: InvoiceProviderCreateManyUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      invoiceProviderModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<InvoiceProviderCreateManyUseCase>(
      InvoiceProviderCreateManyUseCase,
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
      .spyOn(prismaService.invoiceProvider, 'createMany')
      .mockResolvedValue(createManyMock);

    const response = await usecase.execute([createInvoiceProviderInputMock]);

    expect(response).toStrictEqual(createManyMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: [createInvoiceProviderInputMock],
    });
  });
});
