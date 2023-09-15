import { Test, TestingModule } from '@nestjs/testing';
import { TeamRequestService } from './team-request.service';
import { TeamRequestResolver } from './team-request.resolver';
import { ITeamRequestRepository, TeamRequestRepository } from './repository';
import { PrismaService } from '../../db/prisma.service';
import {
  createTeamInputMock,
  paginationOptionsInputMock,
  searchTeamInputMock,
  teamRequestMock,
} from '../../domain/mocks';
import { PrismaModule } from '../../db/prisma.module';
import { HttpException } from '@nestjs/common';

describe('TeamRequestService', () => {
  let service: TeamRequestService;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        TeamRequestResolver,
        TeamRequestService,
        { provide: ITeamRequestRepository, useClass: TeamRequestRepository },
      ],
    }).compile();

    service = moduleRef.get<TeamRequestService>(TeamRequestService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  describe('create', () => {
    it('should create', async () => {
      const createSpy = jest
        .spyOn(prismaService.teamRequest, 'create')
        .mockResolvedValue(teamRequestMock);

      const response = await service.create(createTeamInputMock);

      expect(response).toStrictEqual(teamRequestMock);
      expect(createSpy).toHaveBeenCalledWith({
        data: {
          ...createTeamInputMock,
          status: 'PENDING',
          refusedAt: null,
          calceledAt: null,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should findAll', async () => {
      const findAllSpy = jest
        .spyOn(prismaService.teamRequest, 'findMany')
        .mockResolvedValue([teamRequestMock]);

      const response = await service.findAll(
        searchTeamInputMock,
        paginationOptionsInputMock,
      );

      expect(response).toStrictEqual([teamRequestMock]);
      expect(findAllSpy).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        where: {
          OR: [
            undefined,
            {
              calceledAt: null,
              refusedAt: null,
              status: 'PENDING',
              unitId: '64e2d3d82aafb84e7551e187',
            },
          ],
        },
      });
    });
  });

  describe('findByPersonIdAndUnitId', () => {
    it('should findByPersonIdAnunitId', async () => {
      const findAllSpy = jest
        .spyOn(prismaService.teamRequest, 'findFirst')
        .mockResolvedValue(teamRequestMock);

      const response = await service.findByPersonIdAndUnitId(
        '64e2d3d82aafb84e7551e187',
        '64e2d3d82aafb84e7551e187',
      );

      expect(response).toStrictEqual(teamRequestMock);
      expect(findAllSpy).toHaveBeenCalledWith({
        where: {
          personId: '64e2d3d82aafb84e7551e187',
          unitId: '64e2d3d82aafb84e7551e187',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should findOne', async () => {
      const findSpy = jest
        .spyOn(prismaService.teamRequest, 'findFirst')
        .mockResolvedValue(teamRequestMock);

      const response = await service.findOne('64e2d3d82aafb84e7551e187');

      expect(response).toStrictEqual(teamRequestMock);
      expect(findSpy).toHaveBeenCalledWith({
        where: {
          id: '64e2d3d82aafb84e7551e187',
          status: 'PENDING',
          refusedAt: null,
          calceledAt: null,
        },
      });
    });

    it('Should throw an error when not found team request', async () => {
      jest
        .spyOn(prismaService.teamRequest, 'findFirst')
        .mockResolvedValue(null);

      const spyFind = jest.spyOn(service, 'findOne');

      await expect(service.findOne('1')).rejects.toThrow(HttpException);

      expect(spyFind).toHaveBeenCalledTimes(1);
    });
  });

  describe('cancel', () => {
    it('should cancel', async () => {
      jest
        .spyOn(prismaService.teamRequest, 'findFirst')
        .mockResolvedValue(teamRequestMock);

      const findSpy = jest
        .spyOn(prismaService.teamRequest, 'update')
        .mockResolvedValue(teamRequestMock);

      const response = await service.cancel('64e2d3d82aafb84e7551e187');

      expect(response).toStrictEqual(teamRequestMock);
      expect(findSpy).toHaveBeenCalledWith({
        where: { id: '64e2d3d82aafb84e7551e187' },
        data: {
          status: 'CANCELED',
          calceledAt: expect.any(Date),
        },
      });
    });

    it('Should throw an error when not found team request', async () => {
      jest
        .spyOn(prismaService.teamRequest, 'findFirst')
        .mockResolvedValue(teamRequestMock);

      jest.spyOn(prismaService.teamRequest, 'update').mockResolvedValue(null);

      const spyFind = jest.spyOn(service, 'cancel');

      await expect(service.cancel('1')).rejects.toThrow(HttpException);

      expect(spyFind).toHaveBeenCalledTimes(1);
    });
  });
});
