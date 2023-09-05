import { Test, TestingModule } from '@nestjs/testing';
import { PersonRoleResolver } from './person-role.resolver';
import {
  PersonRoleAssigRoleUseCase,
  PersonRoleRemoveRoleUseCase,
} from './use-cases';
import { personRoleModuleMock } from './person-role.module';
import { personRoleInputMock, personRoleMock } from 'src/domain/mocks';

describe('PersonRoleResolver', () => {
  let resolver: PersonRoleResolver;
  let assigRoleUseCase: PersonRoleAssigRoleUseCase;
  let removeRoleUseCase: PersonRoleRemoveRoleUseCase;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(personRoleModuleMock).compile();

    resolver = moduleRef.get<PersonRoleResolver>(PersonRoleResolver);
    assigRoleUseCase = moduleRef.get<PersonRoleAssigRoleUseCase>(
      PersonRoleAssigRoleUseCase,
    );
    removeRoleUseCase = moduleRef.get<PersonRoleRemoveRoleUseCase>(
      PersonRoleRemoveRoleUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create', async () => {
    jest.spyOn(assigRoleUseCase, 'execute').mockResolvedValue(personRoleMock);

    expect(await resolver.assignPersonRole(personRoleInputMock)).toStrictEqual(
      personRoleMock,
    );
  });

  it('should remove', async () => {
    jest.spyOn(removeRoleUseCase, 'execute').mockResolvedValue(personRoleMock);

    expect(await resolver.removePersonRole(personRoleInputMock)).toStrictEqual(
      personRoleMock,
    );
  });
});
