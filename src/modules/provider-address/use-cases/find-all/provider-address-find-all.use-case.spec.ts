import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import {
  paginationOptionsInputMock,
  providerAddressMock,
} from 'src/domain/mocks';
import { ProviderAddressFindAllUseCase } from './provider-address-find-all.use-case';
import { providerAddressModuleMock } from '../../provider-address.module';

describe('ProviderAddressFindAllUseCase', () => {
  let usecase: ProviderAddressFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      providerAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<ProviderAddressFindAllUseCase>(
      ProviderAddressFindAllUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should findAll', async () => {
    const findAllSpy = jest
      .spyOn(prismaService.providerAddress, 'findMany')
      .mockResolvedValue([providerAddressMock]);

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([providerAddressMock]);
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
