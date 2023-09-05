import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { roleMock } from '../../../../domain/mocks';
import { HttpException } from '@nestjs/common';
import { RoleFindOneUseCase } from './role-find-one.use-case';
import { roleModuleMock } from '../../role.module';

describe('RoleFindOneUseCase', () => {
  let usecase: RoleFindOneUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(roleModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<RoleFindOneUseCase>(RoleFindOneUseCase);
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
      .spyOn(prismaService.role, 'findFirst')
      .mockResolvedValue(roleMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(roleMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
    });
  });

  it('Should throw an error when not found role', async () => {
    jest.spyOn(prismaService.role, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
