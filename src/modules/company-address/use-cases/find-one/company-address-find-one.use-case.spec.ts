import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import { companyAddressMock } from 'src/domain/mocks';
import { CompanyAddressFindOneUseCase } from './company-address-find-one.use-case';
import { companyAddressModuleMock } from '../../company-address.module';

describe('CompanyAddressFindOneUseCase', () => {
  let usecase: CompanyAddressFindOneUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      companyAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CompanyAddressFindOneUseCase>(
      CompanyAddressFindOneUseCase,
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
      .spyOn(prismaService.companyAddress, 'findFirst')
      .mockResolvedValue(companyAddressMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(companyAddressMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found companyAddress', async () => {
    jest
      .spyOn(prismaService.companyAddress, 'findFirst')
      .mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
