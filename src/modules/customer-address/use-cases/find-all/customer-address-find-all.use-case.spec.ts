import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import {
  customerAddressMock,
  paginationOptionsInputMock,
} from 'src/domain/mocks';
import { CustomerAddressFindAllUseCase } from './customer-address-find-all.use-case';
import { customerAddressModuleMock } from '../../customer-address.module';

describe('CustomerAddressFindAllUseCase', () => {
  let usecase: CustomerAddressFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      customerAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CustomerAddressFindAllUseCase>(
      CustomerAddressFindAllUseCase,
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
      .spyOn(prismaService.customerAddress, 'findMany')
      .mockResolvedValue([customerAddressMock]);

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([customerAddressMock]);
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
