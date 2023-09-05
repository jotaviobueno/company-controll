import { Test, TestingModule } from '@nestjs/testing';
import {
  companyMock,
  createCompanyInputMock,
  paginationOptionsInputMock,
  updateCompanyInputMock,
} from '../../domain/mocks';
import { companyModuleMock } from './company.module';
import { CompanyResolver } from './company.resolver';
import {
  CompanyCreateUseCase,
  CompanyFindAllUseCase,
  CompanyFindOneUseCase,
  CompanySoftDeleteUseCase,
  CompanyUpdateUseCase,
} from './use-cases';

describe('CompanyResolver', () => {
  let resolver: CompanyResolver;
  let moduleRef: TestingModule;
  let createUseCase: CompanyCreateUseCase;
  let findAllUseCase: CompanyFindAllUseCase;
  let findOneUseCase: CompanyFindOneUseCase;
  let softDeleteUseCase: CompanySoftDeleteUseCase;
  let updateUseCase: CompanyUpdateUseCase;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule(companyModuleMock).compile();

    resolver = moduleRef.get<CompanyResolver>(CompanyResolver);
    createUseCase = moduleRef.get<CompanyCreateUseCase>(CompanyCreateUseCase);
    findAllUseCase = moduleRef.get<CompanyFindAllUseCase>(
      CompanyFindAllUseCase,
    );
    findOneUseCase = moduleRef.get<CompanyFindOneUseCase>(
      CompanyFindOneUseCase,
    );
    softDeleteUseCase = moduleRef.get<CompanySoftDeleteUseCase>(
      CompanySoftDeleteUseCase,
    );
    updateUseCase = moduleRef.get<CompanyUpdateUseCase>(CompanyUpdateUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create', async () => {
    jest.spyOn(createUseCase, 'execute').mockResolvedValue(companyMock);

    expect(await resolver.createCompany(createCompanyInputMock)).toStrictEqual(
      companyMock,
    );
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

    expect(await resolver.updateCompany(updateCompanyInputMock)).toStrictEqual(
      companyMock,
    );
  });

  it('should remove', async () => {
    jest.spyOn(softDeleteUseCase, 'execute').mockResolvedValue(true);

    expect(await resolver.removeCompany({ id: '1' })).toStrictEqual(true);
  });
});
