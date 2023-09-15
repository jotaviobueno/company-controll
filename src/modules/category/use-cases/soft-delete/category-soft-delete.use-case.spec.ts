import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import { categoryMock } from 'src/domain/mocks';
import { CategorySoftDeleteUseCase } from './category-soft-delete.use-case';
import { categoryModuleMock } from '../../category.module';

describe('CategorySoftDeleteUseCase', () => {
  let usecase: CategorySoftDeleteUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(categoryModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CategorySoftDeleteUseCase>(
      CategorySoftDeleteUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should update', async () => {
    jest
      .spyOn(prismaService.category, 'findFirst')
      .mockResolvedValue(categoryMock);

    const updateSpy = jest
      .spyOn(prismaService.category, 'update')
      .mockResolvedValue(categoryMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(true);
    expect(updateSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        updatedAt: expect.any(Date),
        deletedAt: expect.any(Date),
      },
    });
  });

  it('Should throw an error when failed to update', async () => {
    jest
      .spyOn(prismaService.category, 'findFirst')
      .mockResolvedValue(categoryMock);

    jest.spyOn(prismaService.category, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
