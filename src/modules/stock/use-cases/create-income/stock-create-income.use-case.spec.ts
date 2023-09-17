import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { stockModuleStock } from '../../stock.module';
import { createStockInputMock, productMock, stockMock } from 'src/domain/mocks';
import { StockCreateIncomeUseCase } from './stock-create-income.use-case';

describe('StockCreateIncomeUseCase', () => {
  let usecase: StockCreateIncomeUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(stockModuleStock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<StockCreateIncomeUseCase>(StockCreateIncomeUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should be create if type income', async () => {
    jest
      .spyOn(prismaService.product, 'findFirst')
      .mockResolvedValue(productMock);

    const createSpy = jest
      .spyOn(prismaService.stock, 'create')
      .mockResolvedValue(stockMock);

    const response = await usecase.execute(createStockInputMock);

    expect(response).toStrictEqual(stockMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createStockInputMock,
        deletedAt: null,
      },
    });
  });
});
