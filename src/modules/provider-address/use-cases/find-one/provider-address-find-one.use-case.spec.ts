import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import { providerAddressMock } from 'src/domain/mocks';
import { ProviderAddressFindOneUseCase } from './provider-address-find-one.use-case';
import { providerAddressModuleMock } from '../../provider-address.module';

describe('ProviderAddressFindOneUseCase', () => {
  let usecase: ProviderAddressFindOneUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      providerAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<ProviderAddressFindOneUseCase>(
      ProviderAddressFindOneUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should findOne', async () => {
    const findOneSpy = jest
      .spyOn(prismaService.providerAddress, 'findFirst')
      .mockResolvedValue(providerAddressMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(providerAddressMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found providerAddress', async () => {
    jest
      .spyOn(prismaService.providerAddress, 'findFirst')
      .mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
