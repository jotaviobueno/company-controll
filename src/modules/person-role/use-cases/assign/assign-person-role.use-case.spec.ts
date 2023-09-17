import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { personRoleModuleMock } from '../../person-role.module';
import {
  personMock,
  personRoleInputMock,
  personRoleMock,
  roleMock,
} from 'src/domain/mocks';
import { PersonRoleAssigRoleUseCase } from './assign-person-role.use-case';

describe('PersonRoleAssigRoleUseCase', () => {
  let usecase: PersonRoleAssigRoleUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(personRoleModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonRoleAssigRoleUseCase>(
      PersonRoleAssigRoleUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should assign', async () => {
    jest.spyOn(prismaService.person, 'findFirst').mockResolvedValue(personMock);

    jest.spyOn(prismaService.role, 'findFirst').mockResolvedValue(roleMock);

    jest.spyOn(prismaService.personRole, 'findFirst').mockResolvedValue(null);

    const removeSpy = jest
      .spyOn(prismaService.personRole, 'create')
      .mockResolvedValue(personRoleMock);

    const response = await usecase.execute(personRoleMock);

    expect(response).toStrictEqual(personRoleMock);
    expect(removeSpy).toHaveBeenCalledWith({
      data: {
        ...personRoleInputMock,
        deletedAt: null,
      },
    });
  });
});
