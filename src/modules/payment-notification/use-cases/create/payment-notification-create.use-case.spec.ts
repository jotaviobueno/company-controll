import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { paymentNotificationModuleMock } from '../../payment-notification.module';
import { PaymentNotificationCreateUseCase } from './payment-notification-create.use-case';
import {
  createPaymentNotificationDtoMock,
  paymentNotificationMock,
} from 'src/domain/mocks';

describe('PaymentNotificationCreateUseCase', () => {
  let usecase: PaymentNotificationCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      paymentNotificationModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PaymentNotificationCreateUseCase>(
      PaymentNotificationCreateUseCase,
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...createDto } = createPaymentNotificationDtoMock;

    const createSpy = jest
      .spyOn(prismaService.paymentNotification, 'create')
      .mockResolvedValue(paymentNotificationMock);

    const response = await usecase.execute(createPaymentNotificationDtoMock);

    expect(response).toStrictEqual(paymentNotificationMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createDto,
      },
    });
  });
});
