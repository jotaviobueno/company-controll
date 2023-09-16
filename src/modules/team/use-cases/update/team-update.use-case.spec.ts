import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import { teamMock, updateTeamInputMock } from 'src/domain/mocks';
import { teamModuleMock } from '../../team.module';
import { TeamUpdateUseCase } from './team-update.use-case';

describe('TeamUpdateUseCase', () => {
  let usecase: TeamUpdateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(teamModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<TeamUpdateUseCase>(TeamUpdateUseCase);
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

    const response = await usecase.execute(updateTeamInputMock);

    expect(response).toStrictEqual(teamMock);
    expect(updateSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        updatedAt: expect.any(Date),
      },
    });
  });

  it('Should throw an error when failed to update', async () => {
    jest.spyOn(prismaService.team, 'findFirst').mockResolvedValue(teamMock);

    jest.spyOn(prismaService.team, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute(updateTeamInputMock)).rejects.toThrow(
      HttpException,
    );

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
