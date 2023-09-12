import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { CompanyAddressCreateUseCase } from './company-address-create.use-case';
import { companyAddressModuleMock } from '../../company-address.module';
import {
  addressMock,
  companyAddressMock,
  companyMock,
  createAddressInputMock,
  createCompanyAddressInputMock,
} from 'src/domain/mocks';

describe('CompanyAddressCreateUseCase', () => {
  let usecase: CompanyAddressCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      companyAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CompanyAddressCreateUseCase>(
      CompanyAddressCreateUseCase,
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
      .spyOn(prismaService.company, 'findFirst')
      .mockResolvedValue(companyMock);

    jest.spyOn(prismaService.address, 'create').mockResolvedValue(addressMock);

    const createSpy = jest
      .spyOn(prismaService.companyAddress, 'create')
      .mockResolvedValue(companyAddressMock);

    const response = await usecase.execute({
      companyId: '1',
      ...createAddressInputMock,
    });

    expect(response).toStrictEqual(companyAddressMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createCompanyAddressInputMock,
        deletedAt: null,
      },
    });
  });
});
