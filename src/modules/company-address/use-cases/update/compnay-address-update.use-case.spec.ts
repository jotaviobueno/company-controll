import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import {
  addressMock,
  companyAddressMock,
  updateAddressInputMock,
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
    jest
      .spyOn(prismaService.companyAddress, 'findFirst')
      .mockResolvedValue(companyAddressMock);

    jest
      .spyOn(prismaService.address, 'findFirst')
      .mockResolvedValue(addressMock);

    jest.spyOn(prismaService.address, 'update').mockResolvedValue(addressMock);

    const updateSpy = jest
      .spyOn(prismaService.companyAddress, 'update')
      .mockResolvedValue(companyAddressMock);

    const response = await usecase.execute({
      id: '1',
      ...updateAddressInputMock,
    });

    expect(response).toStrictEqual(companyAddressMock);
    expect(updateSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when failed to update', async () => {
    jest
      .spyOn(prismaService.companyAddress, 'findFirst')
      .mockResolvedValue(companyAddressMock);

    jest
      .spyOn(prismaService.address, 'findFirst')
      .mockResolvedValue(addressMock);

    jest.spyOn(prismaService.address, 'update').mockResolvedValue(addressMock);

    jest.spyOn(prismaService.companyAddress, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(
      usecase.execute({
        id: '1',
        ...updateAddressInputMock,
      }),
    ).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
