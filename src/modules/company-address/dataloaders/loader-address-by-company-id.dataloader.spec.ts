import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/db/prisma.service';
import { addressMock, companyAddressMock } from 'src/domain/mocks';
import { companyAddressModuleMock } from '../company-address.module';
import { LoaderAddressByCompanyId } from './loader-address-by-company-id.dataloader';

describe('LoaderAddressByCompanyId', () => {
  let dataloader: LoaderAddressByCompanyId;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      companyAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    dataloader = moduleRef.get<LoaderAddressByCompanyId>(
      LoaderAddressByCompanyId,
    );
  });

  it('should be defined', () => {
    expect(dataloader).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should create', async () => {
    jest
      .spyOn(prismaService.companyAddress, 'findMany')
      .mockResolvedValue([companyAddressMock]);

    jest
      .spyOn(prismaService.address, 'findMany')
      .mockResolvedValue([addressMock]);

    const response = await dataloader.load('1');

    expect(response).toStrictEqual([addressMock]);
  });
});
