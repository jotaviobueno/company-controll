import { Test, TestingModule } from '@nestjs/testing';
import { ProviderResolver } from './provider.resolver';
import { providerModuleMock } from './provider.module';
import {
  ProdiverCreateUseCase,
  ProviderFindAllUseCase,
  ProviderFindOneUseCase,
  ProviderSoftDeleteUseCase,
  ProviderUpdateUseCase,
} from './use-cases';
import {
  createProviderInputMock,
  paginationOptionsInputMock,
  providerMock,
  updateProviderInputMock,
} from 'src/domain/mocks';

describe('ProviderResolver', () => {
  let resolver: ProviderResolver;

  let createUseCase: ProdiverCreateUseCase;
  let findAllUseCase: ProviderFindAllUseCase;
  let findOneUseCase: ProviderFindOneUseCase;
  let updateUseCase: ProviderUpdateUseCase;
  let softDeleteUseCase: ProviderSoftDeleteUseCase;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(providerModuleMock).compile();

    resolver = module.get<ProviderResolver>(ProviderResolver);
    createUseCase = module.get<ProdiverCreateUseCase>(ProdiverCreateUseCase);
    findAllUseCase = module.get<ProviderFindAllUseCase>(ProviderFindAllUseCase);
    findOneUseCase = module.get<ProviderFindOneUseCase>(ProviderFindOneUseCase);
    updateUseCase = module.get<ProviderUpdateUseCase>(ProviderUpdateUseCase);
    softDeleteUseCase = module.get<ProviderSoftDeleteUseCase>(
      ProviderSoftDeleteUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create', async () => {
    jest.spyOn(createUseCase, 'execute').mockResolvedValue(providerMock);

    expect(
      await resolver.createProvider(createProviderInputMock),
    ).toStrictEqual(providerMock);
  });

  it('should findAll', async () => {
    jest.spyOn(findAllUseCase, 'execute').mockResolvedValue([providerMock]);

    expect(
      await resolver.findAllProvider(paginationOptionsInputMock),
    ).toStrictEqual([providerMock]);
  });

  it('should findOne', async () => {
    jest.spyOn(findOneUseCase, 'execute').mockResolvedValue(providerMock);

    expect(await resolver.findOneProvider({ id: '1' })).toStrictEqual(
      providerMock,
    );
  });

  it('should update', async () => {
    jest.spyOn(updateUseCase, 'execute').mockResolvedValue(providerMock);

    expect(
      await resolver.updateProvider(updateProviderInputMock),
    ).toStrictEqual(providerMock);
  });

  it('should remove', async () => {
    jest.spyOn(softDeleteUseCase, 'execute').mockResolvedValue(true);

    expect(await resolver.removeProvider({ id: '1' })).toStrictEqual(true);
  });
});
