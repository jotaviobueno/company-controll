import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { createPersonTeamInputMock, personTeamMock } from 'src/domain/mocks';
import { HttpException } from '@nestjs/common';
import { PersonTeamFindByTeamIdAndPersonIdUseCase } from './person-team-find-by-team-id-and-person-id.use-case';
import { personTeamModuleMock } from '../../person-team.module';

describe('PersonTeamFindByTeamIdAndPersonIdUseCase', () => {
  let usecase: PersonTeamFindByTeamIdAndPersonIdUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(personTeamModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonTeamFindByTeamIdAndPersonIdUseCase>(
      PersonTeamFindByTeamIdAndPersonIdUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should findOne', async () => {
    const findOneSpy = jest
      .spyOn(prismaService.personTeam, 'findFirst')
      .mockResolvedValue(null);

    const response = await usecase.execute(createPersonTeamInputMock);

    expect(response).toStrictEqual(null);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        personId: '1',
        teamId: '1',
      },
    });
  });

  it('Should throw an error when not found', async () => {
    jest
      .spyOn(prismaService.personTeam, 'findFirst')
      .mockResolvedValue(personTeamMock);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute(createPersonTeamInputMock)).rejects.toThrow(
      HttpException,
    );

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
