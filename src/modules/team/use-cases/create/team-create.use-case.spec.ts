import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { teamModuleMock } from '../../team.module';
import { TeamCreateUseCase } from './team-create.use-case';
import { companyMock, createTeamInputMock, teamMock } from 'src/domain/mocks';

describe('TeamCreateUseCase', () => {
  let usecase: TeamCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(teamModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<TeamCreateUseCase>(TeamCreateUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should create', async () => {
    jest
      .spyOn(prismaService.company, 'findFirst')
      .mockResolvedValue(companyMock);

    const createSpy = jest
      .spyOn(prismaService.team, 'create')
      .mockResolvedValue(teamMock);

    const response = await usecase.execute(createTeamInputMock);

    expect(response).toStrictEqual(teamMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createTeamInputMock,
        deletedAt: null,
      },
    });
  });
});
