import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import { teamMock } from 'src/domain/mocks';
import { teamModuleMock } from '../../team.module';
import { TeamSoftDeleteUseCase } from './team-soft-delete.use-case';

describe('TeamSoftDeleteUseCase', () => {
  let usecase: TeamSoftDeleteUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(teamModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<TeamSoftDeleteUseCase>(TeamSoftDeleteUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should update', async () => {
    jest.spyOn(prismaService.team, 'findFirst').mockResolvedValue(teamMock);

    const updateSpy = jest
      .spyOn(prismaService.team, 'update')
      .mockResolvedValue(teamMock);

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
    jest.spyOn(prismaService.team, 'findFirst').mockResolvedValue(teamMock);

    jest.spyOn(prismaService.team, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
