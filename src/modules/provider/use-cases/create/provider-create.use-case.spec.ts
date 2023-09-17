import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import {
  categoryMock,
  createProviderInputMock,
  providerMock,
} from 'src/domain/mocks';
import { ProviderCreateUseCase } from './provider-create.use-case';
import { providerModuleMock } from '../../provider.module';
import { createManyMock } from 'src/domain/mocks/shared';

describe('ProviderCreateUseCase', () => {
  let usecase: ProviderCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(providerModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<ProviderCreateUseCase>(ProviderCreateUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should create', async () => {
    jest.spyOn(prismaService.category, 'findFirst').mockResolvedValue(null);

    jest
      .spyOn(prismaService.category, 'create')
      .mockResolvedValue(categoryMock);

    jest
      .spyOn(prismaService.providerCategory, 'createMany')
      .mockResolvedValue(createManyMock);

    const createSpy = jest
      .spyOn(prismaService.provider, 'create')
      .mockResolvedValue(providerMock);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categories, ...createDto } = createProviderInputMock;
    const response = await usecase.execute(createProviderInputMock);

    expect(response).toStrictEqual(providerMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  });
});
