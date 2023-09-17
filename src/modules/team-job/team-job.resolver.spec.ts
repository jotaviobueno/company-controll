import { Test, TestingModule } from '@nestjs/testing';
import { teamJobModuleMock } from './team-job.module';
import { TeamJobResolver } from './team-job.resolver';
import {
  TeamJobCreateUseCase,
  TeamJobFindAllUseCase,
  TeamJobSoftDeleteUseCase,
} from './use-cases';
import {
  createTeamJobInputMock,
  paginationOptionsInputMock,
  teamJobMock,
} from 'src/domain/mocks';

describe('TeamJobResolver', () => {
  let resolver: TeamJobResolver;
  let moduleRef: TestingModule;

  let createUseCase: TeamJobCreateUseCase;
  let findAllUseCase: TeamJobFindAllUseCase;
  let softDeleteUseCase: TeamJobSoftDeleteUseCase;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(teamJobModuleMock).compile();

    resolver = moduleRef.get<TeamJobResolver>(TeamJobResolver);

    createUseCase = moduleRef.get<TeamJobCreateUseCase>(TeamJobCreateUseCase);
    findAllUseCase = moduleRef.get<TeamJobFindAllUseCase>(
      TeamJobFindAllUseCase,
    );
    softDeleteUseCase = moduleRef.get<TeamJobSoftDeleteUseCase>(
      TeamJobSoftDeleteUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(() => {
    moduleRef.close();
  });

  it('should create', async () => {
    jest.spyOn(createUseCase, 'execute').mockResolvedValue(teamJobMock);

    expect(await resolver.createTeamJob(createTeamJobInputMock)).toStrictEqual(
      teamJobMock,
    );
  });

  it('should findAll', async () => {
    jest.spyOn(findAllUseCase, 'execute').mockResolvedValue([teamJobMock]);

    expect(
      await resolver.findAllTeamJob(paginationOptionsInputMock),
    ).toStrictEqual([teamJobMock]);
  });

  it('should remove', async () => {
    jest.spyOn(softDeleteUseCase, 'execute').mockResolvedValue(true);

    expect(await resolver.removeTeamJob({ id: '1' })).toStrictEqual(true);
  });
});
