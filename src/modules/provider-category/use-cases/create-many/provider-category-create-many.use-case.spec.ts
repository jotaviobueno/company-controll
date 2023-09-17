import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { providerCategoryModuleMock } from '../../provider-category.module';
import { createProviderCategoryInputMock } from 'src/domain/mocks';
import { ProviderCategoryCreateManyUseCase } from './provider-category-create-many.use-case';
import { createManyMock } from 'src/domain/mocks/shared';

describe('ProviderCategoryCreateManyUseCase', () => {
  let usecase: ProviderCategoryCreateManyUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      providerCategoryModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<ProviderCategoryCreateManyUseCase>(
      ProviderCategoryCreateManyUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should CreateMany', async () => {
    const findOneSpy = jest
      .spyOn(prismaService.providerCategory, 'createMany')
      .mockResolvedValue(createManyMock);

    await usecase.execute([createProviderCategoryInputMock]);

    expect(findOneSpy).toHaveBeenCalledWith({
      data: [{ ...createProviderCategoryInputMock, deletedAt: null }],
    });
  });
});
