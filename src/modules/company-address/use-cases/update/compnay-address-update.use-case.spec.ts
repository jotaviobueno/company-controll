import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import {
  addressMock,
  companyAddressMock,
  updateCompanyAddressInputMock,
} from 'src/domain/mocks';
import { CompanyAddressUpdateUseCase } from './company-address.update.use-case';
import { companyAddressModuleMock } from '../../company-address.module';

describe('CompanyAddressUpdateUseCase', () => {
  let usecase: CompanyAddressUpdateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      companyAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CompanyAddressUpdateUseCase>(
      CompanyAddressUpdateUseCase,
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
    const findOneSpy = jest
      .spyOn(prismaService.companyAddress, 'findFirst')
      .mockResolvedValue(companyAddressMock);

    jest
      .spyOn(prismaService.address, 'findFirst')
      .mockResolvedValue(addressMock);

    jest.spyOn(prismaService.address, 'update').mockResolvedValue(addressMock);

    const response = await usecase.execute(updateCompanyAddressInputMock);

    expect(response).toStrictEqual(companyAddressMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });
});
