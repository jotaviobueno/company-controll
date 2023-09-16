import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { teamRequestMock } from 'src/domain/mocks';
import { HttpException } from '@nestjs/common';
import { teamRequestModuleMock } from '../../team-request.module';
import { TeamRequestFindOneUseCase } from './team-request-find-one.use-case';

describe('TeamRequestFindOneUseCase', () => {
  let usecase: TeamRequestFindOneUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(teamRequestModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<TeamRequestFindOneUseCase>(
      TeamRequestFindOneUseCase,
    );
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
      .spyOn(prismaService.teamRequest, 'findFirst')
      .mockResolvedValue(teamRequestMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(teamRequestMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        status: 'PENDING',
      },
    });
  });

  it('Should throw an error when not found', async () => {
    jest.spyOn(prismaService.teamRequest, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
