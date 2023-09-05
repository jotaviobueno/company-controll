import { Test, TestingModule } from '@nestjs/testing';
import {
  companyMock,
  createCompanyInputMock,
  paginationOptionsInputMock,
} from 'src/domain/mocks';
import { companyModuleMock } from './company.module';
import { CompanyResolver } from './company.resolver';
import {
  CompanyCreateUseCase,
  CompanyFindAllUseCase,
  CompanyFindOneUseCase,
  CompanySoftDeleteUseCase,
  CompanyUpdateUseCase,
} from './use-cases';
import { PersonEntity } from 'src/domain/entities';

describe('CompanyResolver', () => {
  let resolver: CompanyResolver;
  let createUseCase: CompanyCreateUseCase;
  let findAllUseCase: CompanyFindAllUseCase;
  let findOneUseCase: CompanyFindOneUseCase;
  let softDeleteUseCase: CompanySoftDeleteUseCase;
  let updateUseCase: CompanyUpdateUseCase;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(companyModuleMock).compile();

    resolver = module.get<CompanyResolver>(CompanyResolver);
    createUseCase = module.get<CompanyCreateUseCase>(CompanyCreateUseCase);
    findAllUseCase = module.get<CompanyFindAllUseCase>(CompanyFindAllUseCase);
    findOneUseCase = module.get<CompanyFindOneUseCase>(CompanyFindOneUseCase);
    softDeleteUseCase = module.get<CompanySoftDeleteUseCase>(
      CompanySoftDeleteUseCase,
    );
    updateUseCase = module.get<CompanyUpdateUseCase>(CompanyUpdateUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create', async () => {
    jest.spyOn(createUseCase, 'execute').mockResolvedValue(companyMock);

    expect(
      await resolver.createCompany(
        { id: '1' } as PersonEntity,
        createCompanyInputMock,
      ),
    ).toStrictEqual(companyMock);
  });

  it('should findAll', async () => {
    jest.spyOn(findAllUseCase, 'execute').mockResolvedValue([companyMock]);

    expect(
      await resolver.findAllCompany(paginationOptionsInputMock),
    ).toStrictEqual([companyMock]);
  });

  it('should findOne', async () => {
    jest.spyOn(findOneUseCase, 'execute').mockResolvedValue(companyMock);

    expect(await resolver.findOneCompany({ id: '1' })).toStrictEqual(
      companyMock,
    );
  });

  it('should update', async () => {
    jest.spyOn(updateUseCase, 'execute').mockResolvedValue(companyMock);

    expect(await resolver.updateCompany(createCompanyInputMock)).toStrictEqual(
      companyMock,
    );
  });

  it('should remove', async () => {
    jest.spyOn(softDeleteUseCase, 'execute').mockResolvedValue(true);

    expect(await resolver.removeCompany({ id: '1' })).toStrictEqual(true);
  });
});
