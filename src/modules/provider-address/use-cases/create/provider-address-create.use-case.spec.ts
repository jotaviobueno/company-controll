import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import {
  addressMock,
  createAddressInputMock,
  createProviderAddressInputMock,
  providerAddressMock,
  providerMock,
} from 'src/domain/mocks';
import { ProviderAddressCreateUseCase } from './provider-address-create.use-case';
import { providerAddressModuleMock } from '../../provider-address.module';

describe('ProviderAddressCreateUseCase', () => {
  let usecase: ProviderAddressCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      providerAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<ProviderAddressCreateUseCase>(
      ProviderAddressCreateUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should create', async () => {
    jest
      .spyOn(prismaService.provider, 'findFirst')
      .mockResolvedValue(providerMock);

    jest.spyOn(prismaService.address, 'create').mockResolvedValue(addressMock);

    const createSpy = jest
      .spyOn(prismaService.providerAddress, 'create')
      .mockResolvedValue(providerAddressMock);

    const response = await usecase.execute({
      providerId: '1',
      ...createAddressInputMock,
    });

    expect(response).toStrictEqual(providerAddressMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createProviderAddressInputMock,
        deletedAt: null,
      },
    });
  });
});
