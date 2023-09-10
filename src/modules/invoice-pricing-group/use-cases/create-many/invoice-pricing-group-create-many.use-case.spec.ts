import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { InvoicePricingGroupCreateManyUseCase } from './invoice-pricing-group-create-many.use-case';
import { invoicePricingGroupModuleMock } from '../../invoice-pricing-group.module';
import { createInvoicePricingGroupDtoMock } from 'src/domain/mocks';

describe('InvoicePricingGroupCreateManyUseCase', () => {
  let usecase: InvoicePricingGroupCreateManyUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      invoicePricingGroupModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<InvoicePricingGroupCreateManyUseCase>(
      InvoicePricingGroupCreateManyUseCase,
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
      .spyOn(prismaService.invoicePricingGroup, 'createMany')
      .mockResolvedValue({ count: 10 });

    const response = await usecase.execute([createInvoicePricingGroupDtoMock]);

    expect(response).toStrictEqual({ count: 10 });
    expect(createSpy).toHaveBeenCalledWith({
      data: [createInvoicePricingGroupDtoMock],
    });
  });
});
