import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { pricingGroupMock } from 'src/domain/mocks';
import { PricingGroupFindManyWithIdsUseCase } from './pricing-group-find-many-with-ids.use-case';
import { pricingGroupModuleMock } from '../../pricing-group.module';

describe('PricingGroupFindManyWithIdsUseCase', () => {
  let usecase: PricingGroupFindManyWithIdsUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      pricingGroupModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PricingGroupFindManyWithIdsUseCase>(
      PricingGroupFindManyWithIdsUseCase,
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

    const response = await usecase.execute(['1']);

    expect(response).toStrictEqual([pricingGroupMock]);
    expect(findAllSpy).toHaveBeenCalledWith({
      where: {
        id: {
          in: ['1'],
        },
      },
    });
  });
});
