import { Test, TestingModule } from '@nestjs/testing';
import { companyMock, paginationOptionsInputMock } from 'src/domain/mocks';
import { CompanyFindAllUseCase } from './company-find-all.use-case';
import { PrismaService } from 'src/db/prisma.service';
import { companyModuleMock } from '../../company.module';

describe('CompanyFindAllUseCase', () => {
  let usecase: CompanyFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(companyModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CompanyFindAllUseCase>(CompanyFindAllUseCase);
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
      .spyOn(prismaService.company, 'findMany')
      .mockResolvedValue([companyMock]);

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([companyMock]);
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
