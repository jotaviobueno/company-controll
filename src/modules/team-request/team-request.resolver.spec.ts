import { Test, TestingModule } from '@nestjs/testing';
import {
  TeamRequestAcceptUseCase,
  TeamRequestCancelUseCase,
  TeamRequestCreateUseCase,
  TeamRequestFindAllUseCase,
  TeamRequestRefusedUseCase,
} from './use-cases';
import {
  createTeamRequestInputMock,
  paginationOptionsInputMock,
  teamRequestMock,
} from 'src/domain/mocks';
import { teamRequestModuleMock } from './team-request.module';
import { TeamRequestResolver } from './team-request.resolver';

describe('TeamRequestResolver', () => {
  let resolver: TeamRequestResolver;
  let moduleRef: TestingModule;

  let acceptUseCase: TeamRequestAcceptUseCase;
  let createUseCase: TeamRequestCreateUseCase;
  let refusedUseCase: TeamRequestRefusedUseCase;
  let findAllUseCase: TeamRequestFindAllUseCase;
  let cancelUseCase: TeamRequestCancelUseCase;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(teamRequestModuleMock).compile();

    resolver = moduleRef.get<TeamRequestResolver>(TeamRequestResolver);

    acceptUseCase = moduleRef.get<TeamRequestAcceptUseCase>(
      TeamRequestAcceptUseCase,
    );
    createUseCase = moduleRef.get<TeamRequestCreateUseCase>(
      TeamRequestCreateUseCase,
    );
    findAllUseCase = moduleRef.get<TeamRequestFindAllUseCase>(
      TeamRequestFindAllUseCase,
    );
    refusedUseCase = moduleRef.get<TeamRequestRefusedUseCase>(
      TeamRequestRefusedUseCase,
    );
    cancelUseCase = moduleRef.get<TeamRequestCancelUseCase>(
      TeamRequestCancelUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(() => {
    moduleRef.close();
  });

  it('should create', async () => {
    jest.spyOn(createUseCase, 'execute').mockResolvedValue(teamRequestMock);

    expect(
      await resolver.createTeamRequest(createTeamRequestInputMock),
    ).toStrictEqual(teamRequestMock);
  });

  it('should acceptUseCase', async () => {
    jest.spyOn(acceptUseCase, 'execute').mockResolvedValue(teamRequestMock);

    expect(await resolver.acceptTeamRequest({ id: '1' })).toStrictEqual(
      teamRequestMock,
    );
  });

  it('should findAll', async () => {
    jest.spyOn(findAllUseCase, 'execute').mockResolvedValue([teamRequestMock]);

    expect(
      await resolver.findAllTeamRequest(paginationOptionsInputMock),
    ).toStrictEqual([teamRequestMock]);
  });

  it('should refused', async () => {
    jest.spyOn(refusedUseCase, 'execute').mockResolvedValue(teamRequestMock);

    expect(await resolver.refusedTeamRequest({ id: '1' })).toStrictEqual(
      teamRequestMock,
    );
  });

  it('should cancel', async () => {
    jest.spyOn(cancelUseCase, 'execute').mockResolvedValue(teamRequestMock);

    expect(await resolver.cancelTeamRequest({ id: '1' })).toStrictEqual(
      teamRequestMock,
    );
  });
});
