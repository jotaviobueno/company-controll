import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { paymentModuleMock } from '../../payment.module';
import { paymentMock } from 'src/domain/mocks';
import { PaymentFindByPaymentIdUseCase } from './payment-find-by-payment-id.use-case';

describe('PaymentFindByPaymentIdUseCase', () => {
  let usecase: PaymentFindByPaymentIdUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(paymentModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PaymentFindByPaymentIdUseCase>(
      PaymentFindByPaymentIdUseCase,
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
    const createSpy = jest
      .spyOn(prismaService.payment, 'findFirst')
      .mockResolvedValue(paymentMock);

    const response = await usecase.execute('test');

    expect(response).toStrictEqual(paymentMock);
    expect(createSpy).toHaveBeenCalledWith({
      where: {
        paymentId: 'test',
      },
    });
  });
});
