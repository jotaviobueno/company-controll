import { Test, TestingModule } from '@nestjs/testing';
import { PricingGroupResolver } from './pricing-group.resolver';
import {
  PricingGroupCreateUseCase,
  PricingGroupFindAllUseCase,
  PricingGroupFindOneUseCase,
  PricingGroupSoftDeleteUseCase,
  PricingGroupUpdateUseCase,
} from './use-cases';
import { pricingGroupModuleMock } from './pricing-group.module';
import {
  createPricingGroupInputMock,
  paginationOptionsInputMock,
  pricingGroupMock,
  updateCompanyInputMock,
} from 'src/domain/mocks';

describe('PricingGroupResolver', () => {
  let resolver: PricingGroupResolver;
  let moduleRef: TestingModule;

  let createUseCase: PricingGroupCreateUseCase;
  let findAllUseCase: PricingGroupFindAllUseCase;
  let findOneUseCase: PricingGroupFindOneUseCase;
  let softDeleteUseCase: PricingGroupSoftDeleteUseCase;
  let updateUseCase: PricingGroupUpdateUseCase;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      pricingGroupModuleMock,
    ).compile();

    resolver = moduleRef.get<PricingGroupResolver>(PricingGroupResolver);
    createUseCase = moduleRef.get<PricingGroupCreateUseCase>(
      PricingGroupCreateUseCase,
    );
    findAllUseCase = moduleRef.get<PricingGroupFindAllUseCase>(
      PricingGroupFindAllUseCase,
    );
    findOneUseCase = moduleRef.get<PricingGroupFindOneUseCase>(
      PricingGroupFindOneUseCase,
    );
    softDeleteUseCase = moduleRef.get<PricingGroupSoftDeleteUseCase>(
      PricingGroupSoftDeleteUseCase,
    );
    updateUseCase = moduleRef.get<PricingGroupUpdateUseCase>(
      PricingGroupUpdateUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(() => {
    moduleRef.close();
  });

  it('should create', async () => {
    jest.spyOn(createUseCase, 'execute').mockResolvedValue(pricingGroupMock);

    expect(
      await resolver.createPricingGroup(createPricingGroupInputMock),
    ).toStrictEqual(pricingGroupMock);
  });

  it('should findAll', async () => {
    jest.spyOn(findAllUseCase, 'execute').mockResolvedValue([pricingGroupMock]);

    expect(
      await resolver.findAllPricingGroup(paginationOptionsInputMock),
    ).toStrictEqual([pricingGroupMock]);
  });

  it('should findOne', async () => {
    jest.spyOn(findOneUseCase, 'execute').mockResolvedValue(pricingGroupMock);

    expect(await resolver.findOnePricingGroup({ id: '1' })).toStrictEqual(
      pricingGroupMock,
    );
  });

  it('should update', async () => {
    jest.spyOn(updateUseCase, 'execute').mockResolvedValue(pricingGroupMock);

    expect(
      await resolver.updatePricingGroup(updateCompanyInputMock),
    ).toStrictEqual(pricingGroupMock);
  });

  it('should remove', async () => {
    jest.spyOn(softDeleteUseCase, 'execute').mockResolvedValue(true);

    expect(await resolver.removePricingGroup({ id: '1' })).toStrictEqual(true);
  });
});
