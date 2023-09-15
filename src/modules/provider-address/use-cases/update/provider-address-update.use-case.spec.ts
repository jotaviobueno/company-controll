import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import {
  addressMock,
  providerAddressMock,
  updateCompanyAddressInputMock,
} from 'src/domain/mocks';
import { ProviderAddressUpdateUseCase } from './provider-address.update.use-case';
import { providerAddressModuleMock } from '../../provider-address.module';

describe('ProviderAddressUpdateUseCase', () => {
  let usecase: ProviderAddressUpdateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      providerAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<ProviderAddressUpdateUseCase>(
      ProviderAddressUpdateUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should update', async () => {
    const findOneSpy = jest
      .spyOn(prismaService.providerAddress, 'findFirst')
      .mockResolvedValue(providerAddressMock);

    jest
      .spyOn(prismaService.address, 'findFirst')
      .mockResolvedValue(addressMock);

    jest.spyOn(prismaService.address, 'update').mockResolvedValue(addressMock);

    const response = await usecase.execute(updateCompanyAddressInputMock);

    expect(response).toStrictEqual(providerAddressMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });
});
