import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import {
  createPricingGroupInputMock,
  pricingGroupMock,
} from 'src/domain/mocks';
import { PricingGroupCreateUseCase } from './pricing-group-create.use-case';
import { pricingGroupModuleMock } from '../../pricing-group.module';

describe('PricingGroupCreateUseCase', () => {
  let usecase: PricingGroupCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      pricingGroupModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PricingGroupCreateUseCase>(
      PricingGroupCreateUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should create', async () => {
    jest.spyOn(prismaService.pricingGroup, 'findFirst').mockResolvedValue(null);

    const createSpy = jest
      .spyOn(prismaService.pricingGroup, 'create')
      .mockResolvedValue(pricingGroupMock);

    const response = await usecase.execute(createPricingGroupInputMock);

    expect(response).toStrictEqual(pricingGroupMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createPricingGroupInputMock,
        deletedAt: null,
      },
    });
  });
});
