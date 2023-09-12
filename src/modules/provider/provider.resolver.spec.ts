import { Test, TestingModule } from '@nestjs/testing';
import { ProviderResolver } from './provider.resolver';
import { providerModuleMock } from './provider.module';
import {
  ProviderFindAllUseCase,
  ProviderFindOneUseCase,
  ProviderSoftDeleteUseCase,
  ProviderUpdateUseCase,
} from './use-cases';
import {
  paginationOptionsInputMock,
  providerMock,
  updateProviderInputMock,
} from 'src/domain/mocks';

describe('ProviderResolver', () => {
  let resolver: ProviderResolver;

  let moduleRef: TestingModule;

  let findAllUseCase: ProviderFindAllUseCase;
  let findOneUseCase: ProviderFindOneUseCase;
  let updateUseCase: ProviderUpdateUseCase;
  let softDeleteUseCase: ProviderSoftDeleteUseCase;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(providerModuleMock).compile();

    resolver = moduleRef.get<ProviderResolver>(ProviderResolver);
    findAllUseCase = moduleRef.get<ProviderFindAllUseCase>(
      ProviderFindAllUseCase,
    );
    findOneUseCase = moduleRef.get<ProviderFindOneUseCase>(
      ProviderFindOneUseCase,
    );
    updateUseCase = moduleRef.get<ProviderUpdateUseCase>(ProviderUpdateUseCase);
    softDeleteUseCase = moduleRef.get<ProviderSoftDeleteUseCase>(
      ProviderSoftDeleteUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(async () => {
    await moduleRef.close();
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
