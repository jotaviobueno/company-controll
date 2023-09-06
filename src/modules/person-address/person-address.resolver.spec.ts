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

  let createUseCase: PersonAddressCreateUseCase;
  let updateUseCase: PersonAddressUpdateUseCase;
  let findAllUseCase: PersonAddressFindAllUseCase;
  let findOneUseCase: PersonAddressFindOneUseCase;
  let softDeleteUseCase: PersonAddressSoftDeleteUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      personAddressModuleMock,
    ).compile();

    resolver = module.get<PersonAddressResolver>(PersonAddressResolver);
    createUseCase = module.get<PersonAddressCreateUseCase>(
      PersonAddressCreateUseCase,
    );
    updateUseCase = module.get<PersonAddressUpdateUseCase>(
      PersonAddressUpdateUseCase,
    );
    findAllUseCase = module.get<PersonAddressFindAllUseCase>(
      PersonAddressFindAllUseCase,
    );
    findOneUseCase = module.get<PersonAddressFindOneUseCase>(
      PersonAddressFindOneUseCase,
    );
    softDeleteUseCase = module.get<PersonAddressSoftDeleteUseCase>(
      PersonAddressSoftDeleteUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
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
    ).toStrictEqual(personAddressMock);
  });

  it('should findAll', async () => {
    jest
      .spyOn(findAllUseCase, 'execute')
      .mockResolvedValue([personAddressMock]);

    expect(
      await resolver.findAllPersonAddress(paginationOptionsInputMock),
    ).toStrictEqual([personAddressMock]);
  });

  it('should findOne', async () => {
    jest.spyOn(findOneUseCase, 'execute').mockResolvedValue(personAddressMock);

    expect(await resolver.findOnePersonAddress({ id: '1' })).toStrictEqual(
      personAddressMock,
    );
  });

  it('should update', async () => {
    jest.spyOn(updateUseCase, 'execute').mockResolvedValue(personAddressMock);

    expect(
      await resolver.updatePersonAddress({ id: '1' }, createAddressInputMock),
    ).toStrictEqual(personAddressMock);
  });

  it('should remove', async () => {
    jest.spyOn(softDeleteUseCase, 'execute').mockResolvedValue(true);

    expect(await resolver.removePersonAddress({ id: '1' })).toStrictEqual(true);
  });
});
