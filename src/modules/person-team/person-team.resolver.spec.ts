import { Test, TestingModule } from '@nestjs/testing';
import { PersonTeamResolver } from './person-team.resolver';
import { personTeamModuleMock } from './person-team.module';
import { paginationOptionsInputMock, personTeamMock } from 'src/domain/mocks';
import { PersonTeamFindAllUseCase } from './use-cases';

describe('PersonTeamResolver', () => {
  let resolver: PersonTeamResolver;
  let findAllUseCase: PersonTeamFindAllUseCase;

  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(personTeamModuleMock).compile();

    resolver = moduleRef.get<PersonTeamResolver>(PersonTeamResolver);
    findAllUseCase = moduleRef.get<PersonTeamFindAllUseCase>(
      PersonTeamFindAllUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('should findAll', async () => {
    jest.spyOn(findAllUseCase, 'execute').mockResolvedValue([personTeamMock]);

    expect(
      await resolver.findAllPersonTeam(paginationOptionsInputMock),
    ).toStrictEqual([personTeamMock]);
  });
});
