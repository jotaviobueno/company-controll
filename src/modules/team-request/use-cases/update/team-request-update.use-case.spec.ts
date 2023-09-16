import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { teamRequestMock, updateTeamRequestInputMock } from 'src/domain/mocks';
import { TeamRequestUpdateUseCase } from './team-request-update.use-case';
import { teamModuleMock } from 'src/modules/team/team.module';

describe.skip('TeamRequestUpdateUseCase', () => {
  let usecase: TeamRequestUpdateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(teamModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<TeamRequestUpdateUseCase>(TeamRequestUpdateUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should update', async () => {
    const updateSpy = jest
      .spyOn(prismaService.teamRequest, 'update')
      .mockResolvedValue(teamRequestMock);

    const response = await usecase.execute(updateTeamRequestInputMock);

    expect(response).toStrictEqual(teamRequestMock);
    expect(updateSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        updatedAt: expect.any(Date),
      },
    });
  });
});
