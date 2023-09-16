import { Test, TestingModule } from '@nestjs/testing';
import {
  createTeamRequestInputMock,
  personMock,
  teamMock,
  teamRequestMock,
} from 'src/domain/mocks';
import { PrismaService } from 'src/db/prisma.service';
import { teamRequestModuleMock } from '../../team-request.module';
import { TeamRequestCreateUseCase } from './team-request-create.use-case';
import { TEAM_REQUEST_STATUS } from 'src/domain/enums';

describe('TeamRequestCreateUseCase', () => {
  let usecase: TeamRequestCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(teamRequestModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<TeamRequestCreateUseCase>(TeamRequestCreateUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should Create', async () => {
    jest.spyOn(prismaService.person, 'findFirst').mockResolvedValue(personMock);

    jest.spyOn(prismaService.team, 'findFirst').mockResolvedValue(teamMock);

    jest.spyOn(prismaService.teamRequest, 'findFirst').mockResolvedValue(null);

    jest.spyOn(prismaService.personTeam, 'findFirst').mockResolvedValue(null);

    const createSpy = jest
      .spyOn(prismaService.teamRequest, 'create')
      .mockResolvedValue(teamRequestMock);

    const response = await usecase.execute(createTeamRequestInputMock);

    expect(response).toStrictEqual(teamRequestMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createTeamRequestInputMock,
        status: TEAM_REQUEST_STATUS.PENDING,
      },
    });
  });
});
