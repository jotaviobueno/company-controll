import { Test, TestingModule } from '@nestjs/testing';
import { companyMock } from 'src/domain/mocks';
import { CompanyFindManyWithIdsUseCase } from './company-find-many-with-ids.use-case';
import { PrismaService } from 'src/db/prisma.service';
import { companyModuleMock } from '../../company.module';

describe('CompanyFindManyWithIdsUseCase', () => {
  let usecase: CompanyFindManyWithIdsUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(companyModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CompanyFindManyWithIdsUseCase>(
      CompanyFindManyWithIdsUseCase,
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
      .spyOn(prismaService.company, 'findMany')
      .mockResolvedValue([companyMock]);

    const response = await usecase.execute(['1']);

    expect(response).toStrictEqual([companyMock]);
    expect(findAllSpy).toHaveBeenCalledWith({
      where: {
        id: {
          in: ['1'],
        },
      },
    });
  });
});
