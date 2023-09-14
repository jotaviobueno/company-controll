import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { ProviderCategoryCreateUseCase } from './provider-category-create.use-case';
import { providerCategoryModuleMock } from '../../provider-category.module';
import { createProviderCategoryInputMock } from 'src/domain/mocks';

describe('ProviderCategoryCreateUseCase', () => {
  let usecase: ProviderCategoryCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      providerCategoryModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<ProviderCategoryCreateUseCase>(
      ProviderCategoryCreateUseCase,
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
      .mockResolvedValue({ count: 10 });

    await usecase.execute([createProviderCategoryInputMock]);

    expect(findOneSpy).toHaveBeenCalledWith({
      data: [createProviderCategoryInputMock],
    });
  });
});
