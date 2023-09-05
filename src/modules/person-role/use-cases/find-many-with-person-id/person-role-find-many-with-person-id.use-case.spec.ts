import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { personRoleModuleMock } from '../../person-role.module';
import { personRoleMock } from 'src/domain/mocks';
import { PersonRoleFindManyWithPersonIdUseCase } from './person-role-find-many-with-person-id.use-case';

describe('PersonRoleFindManyWithPersonIdUseCase', () => {
  let usecase: PersonRoleFindManyWithPersonIdUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(personRoleModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonRoleFindManyWithPersonIdUseCase>(
      PersonRoleFindManyWithPersonIdUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should findMany', async () => {
    const findSpy = jest
      .spyOn(prismaService.personRole, 'findMany')
      .mockResolvedValue([personRoleMock]);

    const response = await usecase.execute(['1']);

    expect(response).toStrictEqual([personRoleMock]);
    expect(findSpy).toHaveBeenCalledWith({
      where: {
        personId: {
          in: ['1'],
        },
      },
    });
  });
});
