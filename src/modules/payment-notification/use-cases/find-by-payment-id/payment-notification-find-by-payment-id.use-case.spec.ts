import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { PaymentNotificationFindByPaymentIdUseCase } from './payment-notification-find-by-payment-id.use-case';
import { paymentNotificationModuleMock } from '../../payment-notification.module';
import { paymentNotificationMock } from 'src/domain/mocks';

describe('PaymentNotificationFindByPaymentIdUseCase', () => {
  let usecase: PaymentNotificationFindByPaymentIdUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      paymentNotificationModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PaymentNotificationFindByPaymentIdUseCase>(
      PaymentNotificationFindByPaymentIdUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should findByPaymentId', async () => {
    const findOneSpy = jest
      .spyOn(prismaService.paymentNotification, 'findFirst')
      .mockResolvedValue(paymentNotificationMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(paymentNotificationMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        paymentId: '1',
      },
    });
  });

  it('should findByPaymentId', async () => {
    const findOneSpy = jest
      .spyOn(prismaService.paymentNotification, 'findFirst')
      .mockResolvedValue(null);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(null);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        paymentId: '1',
      },
    });
  });
});
