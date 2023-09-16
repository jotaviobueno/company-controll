import { Test, TestingModule } from '@nestjs/testing';
import { teamRequestMock } from 'src/domain/mocks';
import { PrismaService } from 'src/db/prisma.service';
import { teamRequestModuleMock } from '../../team-request.module';
import { TEAM_REQUEST_STATUS } from 'src/domain/enums';
import { TeamRequestRefusedUseCase } from './team-request-refused.use-case';

describe('TeamRequestRefusedUseCase', () => {
  let usecase: TeamRequestRefusedUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(teamRequestModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<TeamRequestRefusedUseCase>(
      TeamRequestRefusedUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should Create', async () => {
    const createSpy = jest
      .spyOn(prismaService.teamRequest, 'findFirst')
      .mockResolvedValue(teamRequestMock);

    jest
      .spyOn(prismaService.teamRequest, 'update')
      .mockResolvedValue(teamRequestMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(teamRequestMock);
    expect(createSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        status: TEAM_REQUEST_STATUS.PENDING,
      },
    });
  });
});
