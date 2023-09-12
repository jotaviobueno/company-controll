import { Test, TestingModule } from '@nestjs/testing';
import { ProviderFindAllUseCase } from './provider-find-all.use-case';
import { PrismaService } from 'src/db/prisma.service';
import { providerModuleMock } from '../../provider.module';
import { paginationOptionsInputMock, providerMock } from 'src/domain/mocks';

describe('ProviderFindAllUseCase', () => {
  let usecase: ProviderFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(providerModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<ProviderFindAllUseCase>(ProviderFindAllUseCase);
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
      .spyOn(prismaService.provider, 'findMany')
      .mockResolvedValue([providerMock]);

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([providerMock]);
    expect(findAllSpy).toHaveBeenCalledWith({
      where: {
        deletedAt: null,
      },
      skip:
        (paginationOptionsInputMock.page - 1) *
        paginationOptionsInputMock.per_page,
      take: paginationOptionsInputMock.per_page,
    });
  });
});
