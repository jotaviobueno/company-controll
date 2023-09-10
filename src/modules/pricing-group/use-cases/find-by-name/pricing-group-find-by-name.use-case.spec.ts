import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import { PricingGroupFindByNameUseCase } from './pricing-group-find-by-name.use-case';
import { pricingGroupModuleMock } from '../../pricing-group.module';
import { pricingGroupMock } from 'src/domain/mocks';

describe('PricingGroupFindByNameUseCase', () => {
  let usecase: PricingGroupFindByNameUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      pricingGroupModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PricingGroupFindByNameUseCase>(
      PricingGroupFindByNameUseCase,
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
      .mockResolvedValue(null);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(null);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        name: '1',
      },
    });
  });

  it('Should throw an error when not found pricingGroup', async () => {
    jest
      .spyOn(prismaService.pricingGroup, 'findFirst')
      .mockResolvedValue(pricingGroupMock);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
