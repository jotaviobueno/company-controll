import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import {
  pricingGroupMock,
  updatePricingGroupInputMock,
} from 'src/domain/mocks';
import { pricingGroupModuleMock } from '../../pricing-group.module';
import { PricingGroupUpdateUseCase } from './pricing-group-update.use-case';

describe('PricingGroupUpdateUseCase', () => {
  let usecase: PricingGroupUpdateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      pricingGroupModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PricingGroupUpdateUseCase>(
      PricingGroupUpdateUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should update', async () => {
    jest
      .spyOn(prismaService.pricingGroup, 'findFirst')
      .mockResolvedValue(pricingGroupMock);

    const updateSpy = jest
      .spyOn(prismaService.pricingGroup, 'update')
      .mockResolvedValue(pricingGroupMock);

    const response = await usecase.execute(updatePricingGroupInputMock);

    expect(response).toStrictEqual(pricingGroupMock);
    expect(updateSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        updatedAt: expect.any(Date),
      },
    });
  });

  it('Should throw an error when failed to update', async () => {
    jest
      .spyOn(prismaService.pricingGroup, 'findFirst')
      .mockResolvedValue(pricingGroupMock);

    jest.spyOn(prismaService.pricingGroup, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute(updatePricingGroupInputMock)).rejects.toThrow(
      HttpException,
    );

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
