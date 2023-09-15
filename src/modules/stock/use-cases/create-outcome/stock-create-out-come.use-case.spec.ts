import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { stockModuleStock } from '../../stock.module';
import { createStockInputMock, productMock, stockMock } from 'src/domain/mocks';
import { StockCreateOutcomeUseCase } from './stock-create-outcome.use-case';
import { STOCK_TYPE_STATUS } from 'src/domain/enums';

describe('StockCreateOutcomeUseCase', () => {
  let usecase: StockCreateOutcomeUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(stockModuleStock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<StockCreateOutcomeUseCase>(
      StockCreateOutcomeUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be create if type outcome', async () => {
    jest
      .spyOn(prismaService.product, 'findFirst')
      .mockResolvedValue(productMock);

    jest.spyOn(prismaService.stock, 'findFirst').mockResolvedValue(stockMock);

    jest.spyOn(prismaService.stock, 'update').mockResolvedValue(stockMock);

    const createSpy = jest
      .spyOn(prismaService.stock, 'create')
      .mockResolvedValue({
        ...stockMock,
        type: STOCK_TYPE_STATUS.OUTCOME,
      });

    const response = await usecase.execute({
      ...createStockInputMock,
      type: STOCK_TYPE_STATUS.OUTCOME,
    });

    expect(response).toStrictEqual({
      ...stockMock,
      type: STOCK_TYPE_STATUS.OUTCOME,
    });
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...{
          ...createStockInputMock,
          type: STOCK_TYPE_STATUS.OUTCOME,
        },
      },
    });
  });
});
