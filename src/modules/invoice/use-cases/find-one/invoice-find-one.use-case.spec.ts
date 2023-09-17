import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { InvoiceFindOneUseCase } from './invoice-find-one.use-case';
import { invoiceModuleMock } from '../../invoice.module';
import { invoiceMock } from 'src/domain/mocks';
import { HttpException } from '@nestjs/common';

describe('InvoiceFindOneUseCase', () => {
  let usecase: InvoiceFindOneUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(invoiceModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<InvoiceFindOneUseCase>(InvoiceFindOneUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should findOne', async () => {
    const findOneSpy = jest
      .spyOn(prismaService.invoice, 'findFirst')
      .mockResolvedValue(invoiceMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(invoiceMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found invoice', async () => {
    jest.spyOn(prismaService.invoice, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
