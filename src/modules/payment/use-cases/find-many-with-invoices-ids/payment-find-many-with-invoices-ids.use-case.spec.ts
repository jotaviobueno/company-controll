import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { paymentMock } from 'src/domain/mocks';
import { PaymentFindManyWithInvoicesIdsUseCase } from './payment-find-many-with-invoices-ids.use-case';
import { paymentModuleMock } from '../../payment.module';

describe('PaymentFindManyWithInvoicesIdsUseCase', () => {
  let usecase: PaymentFindManyWithInvoicesIdsUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(paymentModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PaymentFindManyWithInvoicesIdsUseCase>(
      PaymentFindManyWithInvoicesIdsUseCase,
    );
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
      .spyOn(prismaService.payment, 'findMany')
      .mockResolvedValue([paymentMock]);

    const response = await usecase.execute(['1']);

    expect(response).toStrictEqual([paymentMock]);
    expect(findAllSpy).toHaveBeenCalledWith({
      where: {
        invoiceId: {
          in: ['1'],
        },
      },
    });
  });
});
