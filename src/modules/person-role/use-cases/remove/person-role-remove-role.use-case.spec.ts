import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { PersonRoleRemoveRoleUseCase } from './person-role-remove-role.use-case';
import { personRoleModuleMock } from '../../person-role.module';
import { personMock, personRoleMock, roleMock } from 'src/domain/mocks';

describe('PersonRoleRemoveRoleUseCase', () => {
  let usecase: PersonRoleRemoveRoleUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(personRoleModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonRoleRemoveRoleUseCase>(
      PersonRoleRemoveRoleUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should remove', async () => {
    jest.spyOn(prismaService.person, 'findFirst').mockResolvedValue(personMock);

    jest.spyOn(prismaService.role, 'findFirst').mockResolvedValue(roleMock);

    jest
      .spyOn(prismaService.personRole, 'findFirst')
      .mockResolvedValue(personRoleMock);

    const removeSpy = jest
      .spyOn(prismaService.personRole, 'delete')
      .mockResolvedValue(personRoleMock);

    const response = await usecase.execute(personRoleMock);

    expect(response).toStrictEqual(personRoleMock);
    expect(removeSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
    });
  });
});
