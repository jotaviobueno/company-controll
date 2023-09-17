import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { InvoicePricingGroupCreateManyUseCase } from './invoice-pricing-group-create-many.use-case';
import { invoicePricingGroupModuleMock } from '../../invoice-pricing-group.module';
import { createInvoicePricingGroupDtoMock } from 'src/domain/mocks';
import { createManyMock } from 'src/domain/mocks/shared';

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
      .mockResolvedValue(createManyMock);

    const response = await usecase.execute([createInvoicePricingGroupDtoMock]);

    expect(response).toStrictEqual(createManyMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: [createInvoicePricingGroupDtoMock],
    });
  });
});
