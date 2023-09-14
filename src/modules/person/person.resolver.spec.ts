import { Test, TestingModule } from '@nestjs/testing';
import {
  paginationOptionsInputMock,
  personMock,
  updatePersonInputMock,
} from 'src/domain/mocks';
import { PersonResolver } from './person.resolver';
import {
  PersonFindAllUseCase,
  PersonFindOneUseCase,
  PersonSoftDeleteUseCase,
  PersonUpdateUseCase,
} from './use-cases';
import { personModuleMock } from './person.module';

describe('PersonResolver', () => {
  let resolver: PersonResolver;
  let moduleRef: TestingModule;

  let findAllUseCase: PersonFindAllUseCase;
  let findOneUseCase: PersonFindOneUseCase;
  let updateUseCase: PersonUpdateUseCase;
  let softDeleteUseCase: PersonSoftDeleteUseCase;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(personModuleMock).compile();

    resolver = moduleRef.get<PersonResolver>(PersonResolver);
    findAllUseCase = moduleRef.get<PersonFindAllUseCase>(PersonFindAllUseCase);
    findOneUseCase = moduleRef.get<PersonFindOneUseCase>(PersonFindOneUseCase);
    updateUseCase = moduleRef.get<PersonUpdateUseCase>(PersonUpdateUseCase);
    softDeleteUseCase = moduleRef.get<PersonSoftDeleteUseCase>(
      PersonSoftDeleteUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('should findAll', async () => {
    jest.spyOn(findAllUseCase, 'execute').mockResolvedValue([personMock]);

    expect(
      await resolver.findAllPerson(paginationOptionsInputMock),
    ).toStrictEqual([personMock]);
  });

  it('should findOne', async () => {
    jest.spyOn(findOneUseCase, 'execute').mockResolvedValue(personMock);

    expect(await resolver.findOnePerson({ id: '1' })).toStrictEqual(personMock);
  });

  it('should update', async () => {
    jest.spyOn(updateUseCase, 'execute').mockResolvedValue(personMock);

    expect(await resolver.updatePerson(updatePersonInputMock)).toStrictEqual(
      personMock,
    );
  });

  it('should remove', async () => {
    jest.spyOn(softDeleteUseCase, 'execute').mockResolvedValue(true);

    expect(await resolver.removePerson({ id: '1' })).toStrictEqual(true);
  });
});
