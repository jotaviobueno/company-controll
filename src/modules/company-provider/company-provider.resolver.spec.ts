import { Test, TestingModule } from '@nestjs/testing';
import { CompanyProviderResolver } from './company-provider.resolver';
import { companyProviderModuleMock } from './company-provider.module';
import { CompanyProviderCreateUseCase } from './use-cases';
import { companyProviderMock, createProviderInputMock } from 'src/domain/mocks';

describe('CompanyProviderResolver', () => {
  let resolver: CompanyProviderResolver;
  let moduleRef: TestingModule;

  let companyProviderCreateUseCase: CompanyProviderCreateUseCase;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      companyProviderModuleMock,
    ).compile();

    resolver = moduleRef.get<CompanyProviderResolver>(CompanyProviderResolver);
    companyProviderCreateUseCase = moduleRef.get<CompanyProviderCreateUseCase>(
      CompanyProviderCreateUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('should create', async () => {
    jest
      .spyOn(companyProviderCreateUseCase, 'execute')
      .mockResolvedValue(companyProviderMock);

    expect(
      await resolver.createCompanyProvider(
        { id: '1' },
        createProviderInputMock,
      ),
    ).toStrictEqual(companyProviderMock);
  });
});
