import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { customerModuleMock } from '../../customer.module';
import { createCustomerInputMock, customerMock } from 'src/domain/mocks';
import { CustomerSimpleCreateUseCase } from './customer-simple-create.use-case';

describe('CustomerSimpleCreateUseCase', () => {
  let usecase: CustomerSimpleCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(customerModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CustomerSimpleCreateUseCase>(
      CustomerSimpleCreateUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should create', async () => {
    const updateSpy = jest
      .spyOn(prismaService.customer, 'create')
      .mockResolvedValue(customerMock);

    const response = await usecase.execute(createCustomerInputMock);

    expect(response).toStrictEqual(customerMock);
    expect(updateSpy).toHaveBeenCalledWith({
      data: {
        ...createCustomerInputMock,
        deletedAt: null,
      },
    });
  });
});
