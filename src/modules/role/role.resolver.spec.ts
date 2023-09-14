import { Test, TestingModule } from '@nestjs/testing';
import { RoleResolver } from './role.resolver';
import { roleModuleMock } from './role.module';
import {
  RoleFindAllUseCase,
  RoleFindOneUseCase,
  RoleUpdateUseCase,
} from './use-cases';
import {
  paginationOptionsInputMock,
  roleMock,
  updateRoleInputMock,
} from 'src/domain/mocks';

describe('RoleResolver', () => {
  let resolver: RoleResolver;
  let moduleRef: TestingModule;

  let findAllUseCase: RoleFindAllUseCase;
  let findOneUseCase: RoleFindOneUseCase;
  let updateUseCase: RoleUpdateUseCase;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(roleModuleMock).compile();

    resolver = moduleRef.get<RoleResolver>(RoleResolver);
    findAllUseCase = moduleRef.get<RoleFindAllUseCase>(RoleFindAllUseCase);
    findOneUseCase = moduleRef.get<RoleFindOneUseCase>(RoleFindOneUseCase);
    updateUseCase = moduleRef.get<RoleUpdateUseCase>(RoleUpdateUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(() => {
    moduleRef.close();
  });

  it('should findAll', async () => {
    jest.spyOn(findAllUseCase, 'execute').mockResolvedValue([roleMock]);

    expect(
      await resolver.findAllRoles(paginationOptionsInputMock),
    ).toStrictEqual([roleMock]);
  });

  it('should findOne', async () => {
    jest.spyOn(findOneUseCase, 'execute').mockResolvedValue(roleMock);

    expect(await resolver.findOneRole({ id: '1' })).toStrictEqual(roleMock);
  });

  it('should update', async () => {
    jest.spyOn(updateUseCase, 'execute').mockResolvedValue(roleMock);

    expect(await resolver.updateRole(updateRoleInputMock)).toStrictEqual(
      roleMock,
    );
  });
});
