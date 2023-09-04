import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { CompanyAddressCreateUseCase } from './company-address-create.use-case';
import { companyAddressModuleMock } from '../../company-address.module';
import { companyMock } from 'src/domain/mocks';
import { addressModuleMock } from 'src/modules/address/address.module';

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

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should create', async () => {
    jest
      .spyOn(prismaService.company, 'findFirst')
      .mockResolvedValue(companyMock);

    const createSpy = jest
      .spyOn(prismaService.address, 'create')
      .mockResolvedValue(addressModuleMock);

    const response = await usecase.execute(createPersonInputMock);

    expect(response).toStrictEqual(personMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createPersonInputMock,
        deletedAt: null,
      },
    });
  });
});
