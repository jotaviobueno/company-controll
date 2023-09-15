import { Test, TestingModule } from '@nestjs/testing';
import { TeamRequestResolver } from './team-request.resolver';
import { TeamRequestService } from './team-request.service';
import { ITeamRequestRepository, TeamRequestRepository } from './repository';
import { PrismaModule } from '../../db/prisma.module';
import {
  paginationOptionsInputMock,
  searchTeamRequestInputMock,
  teamRequestMock,
} from '../../domain/mocks';

describe('TeamRequestResolver', () => {
  let resolver: TeamRequestResolver;
  let moduleRef: TestingModule;
  let service: TeamRequestService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        TeamRequestResolver,
        TeamRequestService,
        { provide: ITeamRequestRepository, useClass: TeamRequestRepository },
      ],
    }).compile();

    resolver = moduleRef.get<TeamRequestResolver>(TeamRequestResolver);
    service = moduleRef.get<TeamRequestService>(TeamRequestService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll', () => {
    it('should findAll', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([teamRequestMock]);

      expect(
        await resolver.findAll(
          searchTeamRequestInputMock,
          paginationOptionsInputMock,
        ),
      ).toStrictEqual([teamRequestMock]);
    });
  });

  describe('cancel', () => {
    it('should cancel', async () => {
      jest.spyOn(service, 'cancel').mockResolvedValue(teamRequestMock);

      expect(
        await resolver.cancelTeamRequest({ id: '64e2d3d82aafb84e7551e187' }),
      ).toStrictEqual(teamRequestMock);
    });
  });
});
