import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { CompanyFindOneUseCase } from '../find-one';
import { HttpException } from '@nestjs/common';
import { companyMock } from 'src/domain/mocks';
import { companyModuleMock } from '../../company.module';

describe('CompanyFindOneUseCase', () => {
  let usecase: CompanyFindOneUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(companyModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CompanyFindOneUseCase>(CompanyFindOneUseCase);
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
      .spyOn(prismaService.company, 'findFirst')
      .mockResolvedValue(companyMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(companyMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found company', async () => {
    jest.spyOn(prismaService.company, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
