import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { customerModuleMock } from '../../customer.module';
import { customerMock, paginationOptionsInputMock } from 'src/domain/mocks';
import { CustomerFindAllUseCase } from './customer-find-all.use-case';

describe('CustomerFindAllUseCase', () => {
  let usecase: CustomerFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(customerModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CustomerFindAllUseCase>(CustomerFindAllUseCase);
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
      .spyOn(prismaService.customer, 'findMany')
      .mockResolvedValue([customerMock]);

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([customerMock]);
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
