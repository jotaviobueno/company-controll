import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { paginationOptionsInputMock, teamRequestMock } from 'src/domain/mocks';
import { TeamRequestFindAllUseCase } from './team-request-find-all.use-case';
import { teamRequestModuleMock } from '../../team-request.module';

describe('TeamRequestFindAllUseCase', () => {
  let usecase: TeamRequestFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(teamRequestModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<TeamRequestFindAllUseCase>(
      TeamRequestFindAllUseCase,
    );
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
      .spyOn(prismaService.teamRequest, 'findMany')
      .mockResolvedValue([teamRequestMock]);

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([teamRequestMock]);
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
