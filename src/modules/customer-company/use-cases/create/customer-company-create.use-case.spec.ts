import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { CustomerCompanyCreateUseCase } from './customer-company-create.use-case';
import { customerCompanyModuleMock } from '../../customer-company.module';
import {
  companyMock,
  customerCompanyInputMock,
  customerCompanyMock,
  customerMock,
} from 'src/domain/mocks';

describe('CustomerCompanyCreateUseCase', () => {
  let usecase: CustomerCompanyCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      customerCompanyModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CustomerCompanyCreateUseCase>(
      CustomerCompanyCreateUseCase,
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
    jest
      .spyOn(prismaService.customer, 'findFirst')
      .mockResolvedValue(customerMock);

    jest
      .spyOn(prismaService.company, 'findFirst')
      .mockResolvedValue(companyMock);

    const createSpy = jest
      .spyOn(prismaService.customerCompany, 'create')
      .mockResolvedValue(customerCompanyMock);

    const response = await usecase.execute(customerCompanyInputMock);

    expect(response).toStrictEqual(customerCompanyMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...customerCompanyInputMock,
        deletedAt: null,
      },
    });
  });
});
