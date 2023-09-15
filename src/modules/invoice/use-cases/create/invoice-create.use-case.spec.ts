import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { InvoiceCreateUseCase } from './invoice-create.use-case';
import { invoiceModuleMock } from '../../invoice.module';
import {
  createInvoiceInputMock,
  financeMock,
  invoiceMock,
} from 'src/domain/mocks';
import { INVOICE_STATUS } from 'src/domain/enums';

describe('InvoiceCreateUseCase', () => {
  let usecase: InvoiceCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(invoiceModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<InvoiceCreateUseCase>(InvoiceCreateUseCase);
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
      .spyOn(prismaService.invoice, 'create')
      .mockResolvedValue(invoiceMock);

    const response = await usecase.execute(createInvoiceInputMock);

    expect(response).toStrictEqual(invoiceMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createInvoiceInputMock,
      },
    });
  });

  it('should be create invoice with finance', async () => {
    jest.spyOn(prismaService.finance, 'create').mockResolvedValue(financeMock);

    const createSpy = jest
      .spyOn(prismaService.invoice, 'create')
      .mockResolvedValue({ ...invoiceMock, status: 'OPEN' });

    const response = await usecase.execute({
      ...createInvoiceInputMock,
      status: INVOICE_STATUS.PAID,
    });

    expect(response).toStrictEqual({ ...invoiceMock, status: 'OPEN' });
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...{
          ...createInvoiceInputMock,
          status: INVOICE_STATUS.PAID,
        },
      },
    });
  });
});
