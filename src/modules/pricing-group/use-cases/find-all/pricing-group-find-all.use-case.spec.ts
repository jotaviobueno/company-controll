import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { PricingGroupFindAllUseCase } from './pricing-group-find-all.use-case';
import { pricingGroupModuleMock } from '../../pricing-group.module';
import { paginationOptionsInputMock, pricingGroupMock } from 'src/domain/mocks';

describe('PricingGroupFindAllUseCase', () => {
  let usecase: PricingGroupFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      pricingGroupModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PricingGroupFindAllUseCase>(
      PricingGroupFindAllUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should findAll', async () => {
    const findAllSpy = jest
      .spyOn(prismaService.pricingGroup, 'findMany')
      .mockResolvedValue([pricingGroupMock]);

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([pricingGroupMock]);
    expect(findAllSpy).toHaveBeenCalledWith({
      where: {
        deletedAt: null,
      },
      skip:
        (paginationOptionsInputMock.page - 1) *
        paginationOptionsInputMock.per_page,
      take: paginationOptionsInputMock.per_page,
    });
  });
});
