import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { createInvoicePersonDtoMock } from 'src/domain/mocks';
import { InvoicePersonCreateManyUseCase } from './invoice-person-create-many.use-case';
import { invoicePersonModuleMock } from '../../invoice-person.module';
import { createManyMock } from 'src/domain/mocks/shared';

describe('InvoicePersonCreateManyUseCase', () => {
  let usecase: InvoicePersonCreateManyUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      invoicePersonModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<InvoicePersonCreateManyUseCase>(
      InvoicePersonCreateManyUseCase,
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
      .spyOn(prismaService.invoicePerson, 'createMany')
      .mockResolvedValue(createManyMock);

    const response = await usecase.execute([createInvoicePersonDtoMock]);

    expect(response).toStrictEqual(createManyMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: [{ ...createInvoicePersonDtoMock, deletedAt: null }],
    });
  });
});
