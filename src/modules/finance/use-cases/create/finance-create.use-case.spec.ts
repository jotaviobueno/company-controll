import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { FinanceCreateUseCase } from './finance-create.use-case';
import { financeModuleMock } from '../../finance.module';
import { createFinanceInputMock, financeMock } from 'src/domain/mocks';

describe('FinanceCreateUseCase', () => {
  let usecase: FinanceCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(financeModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<FinanceCreateUseCase>(FinanceCreateUseCase);
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
      .spyOn(prismaService.finance, 'create')
      .mockResolvedValue(financeMock);

    const response = await usecase.execute(createFinanceInputMock);

    expect(response).toStrictEqual(financeMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createFinanceInputMock,
      },
    });
  });
});
