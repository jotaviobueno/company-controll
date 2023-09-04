import { Test, TestingModule } from '@nestjs/testing';
import { paginationOptionsInputMock, personMock } from 'src/domain/mocks';
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
  let findAllUseCase: PersonFindAllUseCase;
  let findOneUseCase: PersonFindOneUseCase;
  let updateUseCase: PersonUpdateUseCase;
  let softDeleteUseCase: PersonSoftDeleteUseCase;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(personModuleMock).compile();

    resolver = module.get<PersonResolver>(PersonResolver);
    findAllUseCase = module.get<PersonFindAllUseCase>(PersonFindAllUseCase);
    findOneUseCase = module.get<PersonFindOneUseCase>(PersonFindOneUseCase);
    updateUseCase = module.get<PersonUpdateUseCase>(PersonUpdateUseCase);
    softDeleteUseCase = module.get<PersonSoftDeleteUseCase>(
      PersonSoftDeleteUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create', async () => {
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

    expect(await resolver.updatePerson({ id: '1' })).toStrictEqual(personMock);
  });

  it('should remove', async () => {
    jest.spyOn(softDeleteUseCase, 'execute').mockResolvedValue(true);

    expect(await resolver.removePerson({ id: '1' })).toStrictEqual(true);
  });
});
