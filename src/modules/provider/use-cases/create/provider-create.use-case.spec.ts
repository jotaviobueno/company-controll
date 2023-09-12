import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { ProdiverCreateUseCase } from './provider-create.use-case';
import { providerModuleMock } from '../../provider.module';
import { createProviderInputMock, providerMock } from 'src/domain/mocks';
import {} from 'jest-leak-detector';

describe('ProdiverCreateUseCase', () => {
  let usecase: ProdiverCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(providerModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<ProdiverCreateUseCase>(ProdiverCreateUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should create', async () => {
    const createSpy = jest
      .spyOn(prismaService.provider, 'create')
      .mockResolvedValue(providerMock);

    const response = await usecase.execute(createProviderInputMock);

    expect(response).toStrictEqual(providerMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createProviderInputMock,
        deletedAt: null,
      },
    });
  });
});
