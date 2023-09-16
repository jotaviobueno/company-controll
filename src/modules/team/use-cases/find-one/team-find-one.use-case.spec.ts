import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { teamModuleMock } from '../../team.module';
import { TeamFindOneUseCase } from './team-find-one.use-case';
import { teamMock } from 'src/domain/mocks';
import { HttpException } from '@nestjs/common';

describe('TeamFindOneUseCase', () => {
  let usecase: TeamFindOneUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(teamModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<TeamFindOneUseCase>(TeamFindOneUseCase);
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
      .spyOn(prismaService.team, 'findFirst')
      .mockResolvedValue(teamMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(teamMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
    });
  });

  it('Should throw an error when not found team', async () => {
    jest.spyOn(prismaService.team, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
