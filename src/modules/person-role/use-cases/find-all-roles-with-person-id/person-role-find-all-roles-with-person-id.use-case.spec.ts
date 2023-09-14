import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { personRoleModuleMock } from '../../person-role.module';
import { personRoleMock } from 'src/domain/mocks';
import { PersonRoleFindAllWithPersonid } from './person-role-find-all-roles-with-person-id';

describe('PersonRoleFindAllWithPersonid', () => {
  let usecase: PersonRoleFindAllWithPersonid;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(personRoleModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonRoleFindAllWithPersonid>(
      PersonRoleFindAllWithPersonid,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should findMany', async () => {
    const findSpy = jest
      .spyOn(prismaService.personRole, 'findMany')
      .mockResolvedValue([personRoleMock]);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual([personRoleMock]);
    expect(findSpy).toHaveBeenCalledWith({
      where: {
        personId: '1',
      },
      include: {
        role: {
          include: {
            rolePermission: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });
  });
});
