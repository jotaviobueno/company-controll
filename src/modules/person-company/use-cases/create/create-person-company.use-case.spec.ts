import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { personCompanyInputMock, personCompanyMock } from 'src/domain/mocks';
import { personCompanyModuleMock } from '../../person-company.module';
import { CreatePersonCompanyUseCase } from './create-person-company.use-case';

describe('CreatePersonCompanyUseCase', () => {
  let usecase: CreatePersonCompanyUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      personCompanyModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CreatePersonCompanyUseCase>(
      CreatePersonCompanyUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should create', async () => {
    const createSpy = jest
      .spyOn(prismaService.personCompany, 'create')
      .mockResolvedValue(personCompanyMock);

    const response = await usecase.execute(personCompanyInputMock);

    expect(response).toStrictEqual(personCompanyMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...personCompanyInputMock,
        deletedAt: null,
      },
    });
  });
});
