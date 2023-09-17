import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { teamJobMock } from 'src/domain/mocks';
import { HttpException } from '@nestjs/common';
import { teamJobModuleMock } from '../../team-job.module';
import { TeamJobFindOneUseCase } from './team-job-find-one.use-case';

describe('TeamJobFindOneUseCase', () => {
  let usecase: TeamJobFindOneUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(teamJobModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<TeamJobFindOneUseCase>(TeamJobFindOneUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should findOne', async () => {
    const findOneSpy = jest
      .spyOn(prismaService.teamJob, 'findFirst')
      .mockResolvedValue(teamJobMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(teamJobMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found teamJob', async () => {
    jest.spyOn(prismaService.teamJob, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
