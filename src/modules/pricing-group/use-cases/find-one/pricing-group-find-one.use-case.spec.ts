import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { pricingGroupMock } from 'src/domain/mocks';
import { HttpException } from '@nestjs/common';
import { PricingGroupFindOneUseCase } from './pricing-group-find-one.use-case';
import { pricingGroupModuleMock } from '../../pricing-group.module';

describe('PricingGroupFindOneUseCase', () => {
  let usecase: PricingGroupFindOneUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      pricingGroupModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PricingGroupFindOneUseCase>(
      PricingGroupFindOneUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should findOne', async () => {
    const findOneSpy = jest
      .spyOn(prismaService.pricingGroup, 'findFirst')
      .mockResolvedValue(pricingGroupMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(pricingGroupMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found pricingGroup', async () => {
    jest.spyOn(prismaService.pricingGroup, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
