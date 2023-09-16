import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { teamModuleMock } from '../../team.module';
import { TeamFindAllUseCase } from './team-find-all.use-case';
import { paginationOptionsInputMock, teamMock } from 'src/domain/mocks';

describe('TeamFindAllUseCase', () => {
  let usecase: TeamFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(teamModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<TeamFindAllUseCase>(TeamFindAllUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should findAll', async () => {
    const findAlSpy = jest
      .spyOn(prismaService.team, 'findMany')
      .mockResolvedValue([teamMock]);

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([teamMock]);
    expect(findAlSpy).toHaveBeenCalledWith({
      where: {
        deletedAt: null,
      },
      skip:
        (paginationOptionsInputMock.page - 1) *
        paginationOptionsInputMock.per_page,
      take: paginationOptionsInputMock.per_page,
    });
  });
});
