import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { AccessFindOneUseCase } from './access-find-one.use-case';
import { accessModuleMock } from '../../access.module';
import { accessMock } from 'src/domain/mocks';

describe('AccessFindOneUseCase', () => {
  let usecase: AccessFindOneUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(accessModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<AccessFindOneUseCase>(AccessFindOneUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should findOne', async () => {
    const findOneSpy = jest
      .spyOn(prismaService.access, 'findFirst')
      .mockResolvedValue(accessMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(accessMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
    });
  });

  it('Should throw an error when not found access', async () => {
    jest.spyOn(prismaService.access, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
