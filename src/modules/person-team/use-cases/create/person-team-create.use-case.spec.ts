import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { createPersonTeamInputMock, personTeamMock } from 'src/domain/mocks';
import { PersonTeamCreateUseCase } from './person-team-create.use-case';
import { personTeamModuleMock } from '../../person-team.module';

describe('PersonTeamCreateUseCase', () => {
  let usecase: PersonTeamCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(personTeamModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonTeamCreateUseCase>(PersonTeamCreateUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should findOne', async () => {
    const createSpy = jest
      .spyOn(prismaService.personTeam, 'create')
      .mockResolvedValue(personTeamMock);

    const response = await usecase.execute(createPersonTeamInputMock);

    expect(response).toStrictEqual(personTeamMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createPersonTeamInputMock,
        deletedAt: null,
      },
    });
  });
});
