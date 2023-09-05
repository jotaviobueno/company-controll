import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import { companyAddressMock } from 'src/domain/mocks';
import { CompanyAddressSoftDeleteUseCase } from './company-address-soft-delete.use-case';
import { companyAddressModuleMock } from '../../company-address.module';

describe('CompanyAddressSoftDeleteUseCase', () => {
  let usecase: CompanyAddressSoftDeleteUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      companyAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CompanyAddressSoftDeleteUseCase>(
      CompanyAddressSoftDeleteUseCase,
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

    const updateSpy = jest
      .spyOn(prismaService.companyAddress, 'update')
      .mockResolvedValue(companyAddressMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(true);
    expect(updateSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        updatedAt: expect.any(Date),
        deletedAt: expect.any(Date),
      },
    });
  });

  it('Should throw an error when failed to update', async () => {
    jest
      .spyOn(prismaService.companyAddress, 'findFirst')
      .mockResolvedValue(companyAddressMock);

    jest.spyOn(prismaService.companyAddress, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
