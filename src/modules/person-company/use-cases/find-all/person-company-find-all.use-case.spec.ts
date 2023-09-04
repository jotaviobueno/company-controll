import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { personCompanyModuleMock } from '../../person-company.module';
import { PersonCompanyFindAllUseCase } from './person-company-find-all.use-case';
import {
  paginationOptionsInputMock,
  personCompanyMock,
} from 'src/domain/mocks';

describe('PersonCompanyFindAllUseCase', () => {
  let usecase: PersonCompanyFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      personCompanyModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonCompanyFindAllUseCase>(
      PersonCompanyFindAllUseCase,
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
      .spyOn(prismaService.personCompany, 'findMany')
      .mockResolvedValue([personCompanyMock]);

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([personCompanyMock]);
    expect(findAllSpy).toHaveBeenCalledWith({
      where: {},
      skip:
        (paginationOptionsInputMock.page - 1) *
        paginationOptionsInputMock.per_page,
      take: paginationOptionsInputMock.per_page,
    });
  });
});
