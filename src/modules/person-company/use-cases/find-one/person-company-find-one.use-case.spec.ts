import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import { personCompanyMock } from 'src/domain/mocks';
import { PersonCompanyFindOneUseCase } from './person-company-find-one.use-case';
import { personCompanyModuleMock } from '../../person-company.module';

describe('PersonCompanyFindOneUseCase', () => {
  let usecase: PersonCompanyFindOneUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      personCompanyModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonCompanyFindOneUseCase>(
      PersonCompanyFindOneUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should findOne', async () => {
    const findOneSpy = jest
      .spyOn(prismaService.personCompany, 'findFirst')
      .mockResolvedValue(personCompanyMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(personCompanyMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
    });
  });

  it('Should throw an error when not found person', async () => {
    jest
      .spyOn(prismaService.personCompany, 'findFirst')
      .mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
