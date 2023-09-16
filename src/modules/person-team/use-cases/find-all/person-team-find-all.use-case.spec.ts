import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { paginationOptionsInputMock, personTeamMock } from 'src/domain/mocks';
import { personTeamModuleMock } from '../../person-team.module';
import { PersonTeamFindAllUseCase } from './person-team-find-all.use-case';

describe.skip('PersonTeamFindAllUseCase', () => {
  let usecase: PersonTeamFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(personTeamModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonTeamFindAllUseCase>(PersonTeamFindAllUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should findAll', async () => {
    const findSpy = jest
      .spyOn(prismaService.personTeam, 'findMany')
      .mockResolvedValue([personTeamMock]);

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([personTeamMock]);
    expect(findSpy).toHaveBeenCalledWith({
      where: {},
      skip:
        (paginationOptionsInputMock.page - 1) *
        paginationOptionsInputMock.per_page,
      take: paginationOptionsInputMock.per_page,
    });
  });
});
