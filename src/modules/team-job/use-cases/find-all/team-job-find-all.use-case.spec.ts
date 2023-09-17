import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { paginationOptionsInputMock, teamJobMock } from 'src/domain/mocks';
import { TeamJobFindAllUseCase } from './team-job-find-all.use-case';
import { teamJobModuleMock } from '../../team-job.module';

describe('TeamJobFindAllUseCase', () => {
  let usecase: TeamJobFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(teamJobModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<TeamJobFindAllUseCase>(TeamJobFindAllUseCase);
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
      .spyOn(prismaService.teamJob, 'findMany')
      .mockResolvedValue([teamJobMock]);

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([teamJobMock]);
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
