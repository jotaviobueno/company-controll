import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { InvoicePricingGroupFindManyWithInvoicesIds } from './invoice-pricing-group-find-many-with-invoices-ids.use-case';
import { invoicePricingGroupMock } from 'src/domain/mocks';
import { invoicePricingGroupModuleMock } from '../../invoice-pricing-group.module';

describe('InvoicePricingGroupFindManyWithInvoicesIds', () => {
  let usecase: InvoicePricingGroupFindManyWithInvoicesIds;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      invoicePricingGroupModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<InvoicePricingGroupFindManyWithInvoicesIds>(
      InvoicePricingGroupFindManyWithInvoicesIds,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should findMany', async () => {
    const findManySpy = jest
      .spyOn(prismaService.invoicePricingGroup, 'findMany')
      .mockResolvedValue([invoicePricingGroupMock]);

    const response = await usecase.execute(['1']);

    expect(response).toStrictEqual([invoicePricingGroupMock]);
    expect(findManySpy).toHaveBeenCalledWith({
      where: {
        invoiceId: {
          in: ['1'],
        },
      },
    });
  });
});
