import { Test, TestingModule } from '@nestjs/testing';
import { PersonAddressResolver } from './person-address.resolver';
import { personAddressModuleMock } from './person-address.module';
import {
  PersonAddressCreateUseCase,
  PersonAddressFindAllUseCase,
  PersonAddressFindOneUseCase,
  PersonAddressSoftDeleteUseCase,
  PersonAddressUpdateUseCase,
} from './use-cases';
import {
  createAddressInputMock,
  paginationOptionsInputMock,
  personAddressMock,
} from 'src/domain/mocks';

describe('PersonAddressResolver', () => {
  let resolver: PersonAddressResolver;
  let moduleRef: TestingModule;

  let createUseCase: PersonAddressCreateUseCase;
  let updateUseCase: PersonAddressUpdateUseCase;
  let findAllUseCase: PersonAddressFindAllUseCase;
  let findOneUseCase: PersonAddressFindOneUseCase;
  let softDeleteUseCase: PersonAddressSoftDeleteUseCase;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      personAddressModuleMock,
    ).compile();

    resolver = moduleRef.get<PersonAddressResolver>(PersonAddressResolver);
    createUseCase = moduleRef.get<PersonAddressCreateUseCase>(
      PersonAddressCreateUseCase,
    );
    updateUseCase = moduleRef.get<PersonAddressUpdateUseCase>(
      PersonAddressUpdateUseCase,
    );
    findAllUseCase = moduleRef.get<PersonAddressFindAllUseCase>(
      PersonAddressFindAllUseCase,
    );
    findOneUseCase = moduleRef.get<PersonAddressFindOneUseCase>(
      PersonAddressFindOneUseCase,
    );
    softDeleteUseCase = moduleRef.get<PersonAddressSoftDeleteUseCase>(
      PersonAddressSoftDeleteUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(() => {
    moduleRef.close();
  });

  it('should create', async () => {
    jest.spyOn(createUseCase, 'execute').mockResolvedValue(personAddressMock);

    expect(
      await resolver.createPersonAddress(
        {
          id: '1',
        },
        createAddressInputMock,
      ),
    ).toEqual(personAddressMock);
  });

  it('should findAll', async () => {
    jest
      .spyOn(findAllUseCase, 'execute')
      .mockResolvedValue([personAddressMock]);

    expect(
      await resolver.findAllPersonAddress(paginationOptionsInputMock),
    ).toEqual([personAddressMock]);
  });

  it('should findOne', async () => {
    jest.spyOn(findOneUseCase, 'execute').mockResolvedValue(personAddressMock);

    expect(await resolver.findOnePersonAddress({ id: '1' })).toEqual(
      personAddressMock,
    );
  });

  it('should update', async () => {
    jest.spyOn(updateUseCase, 'execute').mockResolvedValue(personAddressMock);

    expect(
      await resolver.updatePersonAddress({ id: '1' }, createAddressInputMock),
    ).toEqual(personAddressMock);
  });

  it('should remove', async () => {
    jest.spyOn(softDeleteUseCase, 'execute').mockResolvedValue(true);

    expect(await resolver.removePersonAddress({ id: '1' })).toEqual(true);
  });
});
