import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { paginationOptionsInputMock, roleMock } from '../../../../domain/mocks';
import { RoleFindAllUseCase } from './role-find-all.use-case';
import { roleModuleMock } from '../../role.module';

describe('RoleFindAllUseCase', () => {
  let usecase: RoleFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(roleModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<RoleFindAllUseCase>(RoleFindAllUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should findAll', async () => {
    const findAllSpy = jest
      .spyOn(prismaService.role, 'findMany')
      .mockResolvedValue([roleMock]);

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([roleMock]);
    expect(findAllSpy).toHaveBeenCalledWith({
      where: {},
      skip:
        (paginationOptionsInputMock.page - 1) *
        paginationOptionsInputMock.per_page,
      take: paginationOptionsInputMock.per_page,
    });
  });
});
