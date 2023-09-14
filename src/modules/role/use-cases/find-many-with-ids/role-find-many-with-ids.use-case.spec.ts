import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { roleMock } from '../../../../domain/mocks';
import { roleModuleMock } from '../../role.module';
import { RoleFindManyWithIdsUseCase } from './role-find-many-with-ids.use-case';

describe('RoleFindManyWithIdsUseCase', () => {
  let usecase: RoleFindManyWithIdsUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(roleModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<RoleFindManyWithIdsUseCase>(
      RoleFindManyWithIdsUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should findAll', async () => {
    const findAllSpy = jest
      .spyOn(prismaService.role, 'findMany')
      .mockResolvedValue([roleMock]);

    const response = await usecase.execute(['1']);

    expect(response).toStrictEqual([roleMock]);
    expect(findAllSpy).toHaveBeenCalledWith({
      where: {
        id: {
          in: ['1'],
        },
      },
    });
  });
});
