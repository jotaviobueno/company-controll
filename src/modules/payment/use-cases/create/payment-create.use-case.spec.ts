import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { paymentModuleMock } from '../../payment.module';
import { PaymentCreateUseCase } from './payment-create.use-case';
import { createPaymentDtoMock, paymentMock } from 'src/domain/mocks';

describe('PaymentCreateUseCase', () => {
  let usecase: PaymentCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(paymentModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PaymentCreateUseCase>(PaymentCreateUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should create', async () => {
    const createSpy = jest
      .spyOn(prismaService.payment, 'create')
      .mockResolvedValue(paymentMock);

    const response = await usecase.execute(createPaymentDtoMock);

    expect(response).toStrictEqual(paymentMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createPaymentDtoMock,
      },
    });
  });
});
