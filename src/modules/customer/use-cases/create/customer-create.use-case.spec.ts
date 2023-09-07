import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { CustomerCreateUseCase } from './customer-create.use-case';
import { customerModuleMock } from '../../customer.module';
import {
  companyMock,
  createCustomerInputMock,
  customerMock,
} from 'src/domain/mocks';

describe('CustomerCreateUseCase', () => {
  let usecase: CustomerCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(customerModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CustomerCreateUseCase>(CustomerCreateUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should create', async () => {
    jest
      .spyOn(prismaService.company, 'findFirst')
      .mockResolvedValue(companyMock);

    jest.spyOn(prismaService.customer, 'findFirst').mockResolvedValue(null);

    const createSpy = jest
      .spyOn(prismaService.customer, 'create')
      .mockResolvedValue(customerMock);

    const response = await usecase.execute(createCustomerInputMock);

    expect(response).toStrictEqual(customerMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createCustomerInputMock,
        deletedAt: null,
      },
    });
  });
});
