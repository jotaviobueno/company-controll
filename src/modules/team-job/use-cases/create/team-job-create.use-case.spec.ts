import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import {
  createTeamJobInputMock,
  jobMock,
  teamJobMock,
  teamMock,
} from 'src/domain/mocks';
import { TeamJobCreateUseCase } from './team-job-create.use-case';
import { teamJobModuleMock } from '../../team-job.module';
import { HttpException } from '@nestjs/common';

describe('TeamJobCreateUseCase', () => {
  let usecase: TeamJobCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(teamJobModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<TeamJobCreateUseCase>(TeamJobCreateUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should create', async () => {
    jest.spyOn(prismaService.team, 'findFirst').mockResolvedValue(teamMock);

    jest.spyOn(prismaService.job, 'findFirst').mockResolvedValue(jobMock);

    jest.spyOn(prismaService.teamJob, 'findFirst').mockResolvedValue(null);

    const createSpy = jest
      .spyOn(prismaService.teamJob, 'create')
      .mockResolvedValue(teamJobMock);

    const response = await usecase.execute(createTeamJobInputMock);

    expect(response).toStrictEqual(teamJobMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createTeamJobInputMock,
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when team job already exist in team', async () => {
    jest.spyOn(prismaService.team, 'findFirst').mockResolvedValue(teamMock);

    jest.spyOn(prismaService.job, 'findFirst').mockResolvedValue(jobMock);

    jest
      .spyOn(prismaService.teamJob, 'findFirst')
      .mockResolvedValue(teamJobMock);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute(createTeamJobInputMock)).rejects.toThrow(
      HttpException,
    );

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
