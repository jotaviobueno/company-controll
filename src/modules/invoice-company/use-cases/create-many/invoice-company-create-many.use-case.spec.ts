import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { createInvoiceCompanyDtoMock } from 'src/domain/mocks';
import { InvoiceCompanyCreateManyUseCase } from './invoice-company-create-many.use-case';
import { invoiceCompanyModuleMock } from '../../invoice-company.module';
import { createManyMock } from 'src/domain/mocks/shared';

describe('InvoiceCompanyCreateManyUseCase', () => {
  let usecase: InvoiceCompanyCreateManyUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      invoiceCompanyModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<InvoiceCompanyCreateManyUseCase>(
      InvoiceCompanyCreateManyUseCase,
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
      .spyOn(prismaService.invoiceCompany, 'createMany')
      .mockResolvedValue(createManyMock);

    const response = await usecase.execute([createInvoiceCompanyDtoMock]);

    expect(response).toStrictEqual(createManyMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: [{ ...createInvoiceCompanyDtoMock, deletedAt: null }],
    });
  });
});
