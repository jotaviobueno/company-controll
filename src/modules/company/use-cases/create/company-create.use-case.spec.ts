import { Test, TestingModule } from '@nestjs/testing';
import {
  cnpjResponseModelMock,
  companyMock,
  createCompanyInputMock,
  personCompanyMock,
} from 'src/domain/mocks';
import { PrismaService } from 'src/db/prisma.service';
import { companyModuleMock } from '../../company.module';
import { CompanyCreateUseCase } from './company-create.use-case';
import { getCnpj } from 'src/domain/utils';
import axios from 'axios';
import { HttpException } from '@nestjs/common';

describe('CompanyCreateUseCase', () => {
  let usecase: CompanyCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(companyModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CompanyCreateUseCase>(CompanyCreateUseCase);
  });

  it('should be possible create company', async () => {
    jest.spyOn(prismaService.company, 'findFirst').mockResolvedValue(null);

    jest.spyOn(axios, 'get').mockImplementationOnce(() =>
      Promise.resolve({
        data: cnpjResponseModelMock,
      }),
    );

    jest.fn(getCnpj).mockResolvedValue({
      createCompanyInput: {
        cnpj: '10',
        corporateName: 'test',
        status: 'test',
        sector: 'test',
      },
      createAddressInput: {
        city: '1',
        neighborhood: '1',
        number: '1',
        state: '1',
        street: '1',
        zipCode: 123,
      },
    });

    jest
      .spyOn(prismaService.personCompany, 'create')
      .mockResolvedValue(personCompanyMock);

    const createSpy = jest
      .spyOn(prismaService.company, 'create')
      .mockResolvedValue(companyMock);

    const response = await usecase.execute(createCompanyInputMock, '1');

    expect(response).toStrictEqual(companyMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createCompanyInputMock,
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when already exist cnpj', async () => {
    jest
      .spyOn(prismaService.company, 'findFirst')
      .mockResolvedValue(companyMock);

    const spyCreate = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute(createCompanyInputMock, '1')).rejects.toThrow(
      HttpException,
    );

    expect(spyCreate).toHaveBeenCalledTimes(1);
  });
});
