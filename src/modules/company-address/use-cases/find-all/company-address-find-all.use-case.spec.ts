import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import {
  companyAddressMock,
  paginationOptionsInputMock,
} from 'src/domain/mocks';
import { CompanyAddressFindAllUseCase } from './company-address-find-all.use-case';
import { companyAddressModuleMock } from '../../company-address.module';

describe('CompanyAddressFindAllUseCase', () => {
  let usecase: CompanyAddressFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      companyAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CompanyAddressFindAllUseCase>(
      CompanyAddressFindAllUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should findAll', async () => {
    const findAllSpy = jest
      .spyOn(prismaService.companyAddress, 'findMany')
      .mockResolvedValue([companyAddressMock]);

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([companyAddressMock]);
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
