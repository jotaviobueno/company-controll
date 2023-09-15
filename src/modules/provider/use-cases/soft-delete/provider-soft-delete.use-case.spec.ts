import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import { providerMock } from 'src/domain/mocks';
import { ProviderSoftDeleteUseCase } from './provider-soft-delete.use-case';
import { providerModuleMock } from '../../provider.module';

describe('ProviderSoftDeleteUseCase', () => {
  let usecase: ProviderSoftDeleteUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(providerModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<ProviderSoftDeleteUseCase>(
      ProviderSoftDeleteUseCase,
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
      .spyOn(prismaService.provider, 'findFirst')
      .mockResolvedValue(providerMock);

    const updateSpy = jest
      .spyOn(prismaService.provider, 'update')
      .mockResolvedValue(providerMock);

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
      .spyOn(prismaService.provider, 'findFirst')
      .mockResolvedValue(providerMock);

    jest.spyOn(prismaService.provider, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
