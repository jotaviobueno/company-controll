import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import { CustomerCompanyRemoveUseCase } from './customer-company-soft-delete.use-case';
import { customerCompanyModuleMock } from '../../customer-company.module';
import { customerCompanyMock } from 'src/domain/mocks';

describe('CustomerCompanyRemoveUseCase', () => {
  let usecase: CustomerCompanyRemoveUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      customerCompanyModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CustomerCompanyRemoveUseCase>(
      CustomerCompanyRemoveUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should update', async () => {
    jest
      .spyOn(prismaService.customerCompany, 'findFirst')
      .mockResolvedValue(customerCompanyMock);

    const updateSpy = jest
      .spyOn(prismaService.customerCompany, 'update')
      .mockResolvedValue(customerCompanyMock);

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
      .spyOn(prismaService.customerCompany, 'findFirst')
      .mockResolvedValue(customerCompanyMock);

    jest.spyOn(prismaService.customerCompany, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
