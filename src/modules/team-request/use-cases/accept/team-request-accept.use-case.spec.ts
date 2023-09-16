import { Test, TestingModule } from '@nestjs/testing';
import { personTeamMock, teamRequestMock } from 'src/domain/mocks';
import { PrismaService } from 'src/db/prisma.service';
import { teamRequestModuleMock } from '../../team-request.module';
import { TEAM_REQUEST_STATUS } from 'src/domain/enums';
import { TeamRequestAcceptUseCase } from './team-request-accept.use-case';

describe('TeamRequestAcceptUseCase', () => {
  let usecase: TeamRequestAcceptUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(teamRequestModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<TeamRequestAcceptUseCase>(TeamRequestAcceptUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should Create', async () => {
    const findSpy = jest
      .spyOn(prismaService.teamRequest, 'findFirst')
      .mockResolvedValue(teamRequestMock);

    jest
      .spyOn(prismaService.personTeam, 'create')
      .mockResolvedValue(personTeamMock);

    jest
      .spyOn(prismaService.teamRequest, 'update')
      .mockResolvedValue(teamRequestMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(teamRequestMock);
    expect(findSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        status: TEAM_REQUEST_STATUS.PENDING,
      },
    });
  });
});
