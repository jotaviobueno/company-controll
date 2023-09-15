import { Test, TestingModule } from '@nestjs/testing';
import {
  TeamCreateUseCase,
  TeamFindAllUseCase,
  TeamFindOneUseCase,
  TeamSoftDeleteUseCase,
  TeamUpdateUseCase,
} from './use-cases';
import {
  createTeamInputMock,
  paginationOptionsInputMock,
  teamMock,
  updateTeamInputMock,
} from 'src/domain/mocks';
import { TeamResolver } from './team.resolver';
import { teamModuleMock } from './team.module';

describe('TeamResolver', () => {
  let resolver: TeamResolver;
  let moduleRef: TestingModule;

  let createUseCase: TeamCreateUseCase;
  let findAllUseCase: TeamFindAllUseCase;
  let findOneUseCase: TeamFindOneUseCase;
  let updateUseCase: TeamUpdateUseCase;
  let softDeleteUseCase: TeamSoftDeleteUseCase;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(teamModuleMock).compile();

    resolver = moduleRef.get<TeamResolver>(TeamResolver);

    createUseCase = moduleRef.get<TeamCreateUseCase>(TeamCreateUseCase);
    findAllUseCase = moduleRef.get<TeamFindAllUseCase>(TeamFindAllUseCase);
    findOneUseCase = moduleRef.get<TeamFindOneUseCase>(TeamFindOneUseCase);
    updateUseCase = moduleRef.get<TeamUpdateUseCase>(TeamUpdateUseCase);
    softDeleteUseCase = moduleRef.get<TeamSoftDeleteUseCase>(
      TeamSoftDeleteUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(() => {
    moduleRef.close();
  });

  it('should create', async () => {
    jest.spyOn(createUseCase, 'execute').mockResolvedValue(teamMock);

    expect(await resolver.createTeam(createTeamInputMock)).toStrictEqual(
      teamMock,
    );
  });

  it('should findAll', async () => {
    jest.spyOn(findAllUseCase, 'execute').mockResolvedValue([teamMock]);

    expect(
      await resolver.findAllTeam(paginationOptionsInputMock),
    ).toStrictEqual([teamMock]);
  });

  it('should findOne', async () => {
    jest.spyOn(findOneUseCase, 'execute').mockResolvedValue(teamMock);

    expect(await resolver.findOneTeam({ id: '1' })).toStrictEqual(teamMock);
  });

  it('should update', async () => {
    jest.spyOn(updateUseCase, 'execute').mockResolvedValue(teamMock);

    expect(await resolver.updateTeam(updateTeamInputMock)).toStrictEqual(
      teamMock,
    );
  });

  it('should remove', async () => {
    jest.spyOn(softDeleteUseCase, 'execute').mockResolvedValue(true);

    expect(await resolver.removeTeam({ id: '1' })).toStrictEqual(true);
  });
});
