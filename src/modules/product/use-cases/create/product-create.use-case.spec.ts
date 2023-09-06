import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { ProductCreateUseCase } from './product-create.use-case';
import { productModuleMock } from '../../product.module';
import {
  companyMock,
  createProductInputMock,
  productMock,
} from 'src/domain/mocks';

describe('ProductCreateUseCase', () => {
  let usecase: ProductCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(productModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<ProductCreateUseCase>(ProductCreateUseCase);
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

    const createSpy = jest
      .spyOn(prismaService.product, 'create')
      .mockResolvedValue(productMock);

    const response = await usecase.execute(createProductInputMock);

    expect(response).toStrictEqual(productMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createProductInputMock,
        deletedAt: null,
      },
    });
  });
});
