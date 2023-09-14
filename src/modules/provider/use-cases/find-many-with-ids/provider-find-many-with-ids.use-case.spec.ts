import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { providerMock } from 'src/domain/mocks';
import { ProviderFindManyWithIdsUseCase } from './provider-find-many-with-ids.use-case';
import { providerModuleMock } from '../../provider.module';

describe('ProviderFindManyWithIdsUseCase', () => {
  let usecase: ProviderFindManyWithIdsUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(providerModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<ProviderFindManyWithIdsUseCase>(
      ProviderFindManyWithIdsUseCase,
    );
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

    const response = await usecase.execute(['1']);

    expect(response).toStrictEqual([providerMock]);
    expect(findAllSpy).toHaveBeenCalledWith({
      where: {
        id: {
          in: ['1'],
        },
      },
    });
  });
});
