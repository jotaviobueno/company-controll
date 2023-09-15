import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { customerMock } from 'src/domain/mocks';
import { customerModuleMock } from '../../customer.module';
import { CustomerFindByCpfUseCase } from './customer-find-by-cpf.use-case';

describe('CustomerFindByCpfUseCase', () => {
  let usecase: CustomerFindByCpfUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(customerModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CustomerFindByCpfUseCase>(CustomerFindByCpfUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should findbyCpf', async () => {
    const findOneSpy = jest
      .spyOn(prismaService.customer, 'findFirst')
      .mockResolvedValue(customerMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(customerMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        cpf: '1',
        deletedAt: null,
      },
    });
  });
});
