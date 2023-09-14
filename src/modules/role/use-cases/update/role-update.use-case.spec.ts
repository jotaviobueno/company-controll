import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { RoleUpdateUseCase } from '../update';
import { roleMock, updateRoleInputMock } from '../../../../domain/mocks';
import { HttpException } from '@nestjs/common';
import { roleModuleMock } from '../../role.module';

describe('RoleUpdateUseCase', () => {
  let usecase: RoleUpdateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(roleModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<RoleUpdateUseCase>(RoleUpdateUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should update', async () => {
    jest.spyOn(prismaService.role, 'findFirst').mockResolvedValue(roleMock);

    const updateSpy = jest
      .spyOn(prismaService.role, 'update')
      .mockResolvedValue(roleMock);

    const response = await usecase.execute(updateRoleInputMock);

    expect(response).toStrictEqual(roleMock);
    expect(updateSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        ...updateRoleInputMock,
        updatedAt: expect.any(Date),
      },
    });
  });

  it('Should throw an error when failed to update', async () => {
    jest.spyOn(prismaService.role, 'findFirst').mockResolvedValue(roleMock);

    jest.spyOn(prismaService.role, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute(updateRoleInputMock)).rejects.toThrow(
      HttpException,
    );

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
