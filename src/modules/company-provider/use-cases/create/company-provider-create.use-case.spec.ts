import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { CompanyProviderCreateUseCase } from './company-provider-create.use-case';
import { companyProviderModuleMock } from '../../company-provider.module';
import {
  categoryMock,
  companyMock,
  companyProviderMock,
  createProviderInputMock,
  providerMock,
} from 'src/domain/mocks';
import { createManyMock } from 'src/domain/mocks/shared';

describe('CompanyProviderCreateUseCase', () => {
  let usecase: CompanyProviderCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      companyProviderModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CompanyProviderCreateUseCase>(
      CompanyProviderCreateUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should create', async () => {
    jest
      .spyOn(prismaService.company, 'findFirst')
      .mockResolvedValue(companyMock);

    jest.spyOn(prismaService.category, 'findFirst').mockResolvedValue(null);

    jest
      .spyOn(prismaService.category, 'create')
      .mockResolvedValue(categoryMock);

    jest
      .spyOn(prismaService.provider, 'create')
      .mockResolvedValue(providerMock);

    jest
      .spyOn(prismaService.providerCategory, 'createMany')
      .mockResolvedValue(createManyMock);

    jest
      .spyOn(prismaService.companyProvider, 'create')
      .mockResolvedValue(companyProviderMock);

    const response = await usecase.execute({
      ...createProviderInputMock,
      companyId: '1',
    });

    expect(response).toStrictEqual(companyProviderMock);
  });
});
