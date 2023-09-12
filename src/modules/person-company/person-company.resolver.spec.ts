import { Test, TestingModule } from '@nestjs/testing';
import { PersonCompanyResolver } from './person-company.resolver';
import { personCompanyModuleMock } from './person-company.module';
import {
  PersonCompanyFindAllUseCase,
  PersonCompanyFindOneUseCase,
} from './use-cases';
import {
  paginationOptionsInputMock,
  personCompanyMock,
} from 'src/domain/mocks';

describe('PersonCompanyResolver', () => {
  let resolver: PersonCompanyResolver;
  let moduleRef: TestingModule;

  let findAllUseCase: PersonCompanyFindAllUseCase;
  let findOneUseCase: PersonCompanyFindOneUseCase;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      personCompanyModuleMock,
    ).compile();

    resolver = moduleRef.get<PersonCompanyResolver>(PersonCompanyResolver);
    findAllUseCase = moduleRef.get<PersonCompanyFindAllUseCase>(
      PersonCompanyFindAllUseCase,
    );
    findOneUseCase = moduleRef.get<PersonCompanyFindOneUseCase>(
      PersonCompanyFindOneUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('should findAll', async () => {
    jest
      .spyOn(findAllUseCase, 'execute')
      .mockResolvedValue([personCompanyMock]);

    expect(
      await resolver.findAllPersonCompany(paginationOptionsInputMock),
    ).toStrictEqual([personCompanyMock]);
  });

  it('should findOne', async () => {
    jest.spyOn(findOneUseCase, 'execute').mockResolvedValue(personCompanyMock);

    expect(await resolver.findOnePersonCompany({ id: '1' })).toStrictEqual(
      personCompanyMock,
    );
  });
});
