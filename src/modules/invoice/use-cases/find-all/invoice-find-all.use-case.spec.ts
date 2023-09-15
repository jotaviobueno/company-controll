import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { invoiceModuleMock } from '../../invoice.module';
import { invoiceMock, paginationOptionsInputMock } from 'src/domain/mocks';
import { InvoiceFindAllUseCase } from './invoice-find-all.use-case';

describe('InvoiceFindAllUseCase', () => {
  let usecase: InvoiceFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(invoiceModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<InvoiceFindAllUseCase>(InvoiceFindAllUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should findAll', async () => {
    const findAllSpy = jest
      .spyOn(prismaService.invoice, 'findMany')
      .mockResolvedValue([invoiceMock]);

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([invoiceMock]);
    expect(findAllSpy).toHaveBeenCalledWith({
      where: {},
      skip:
        (paginationOptionsInputMock.page - 1) *
        paginationOptionsInputMock.per_page,
      take: paginationOptionsInputMock.per_page,
    });
  });
});
