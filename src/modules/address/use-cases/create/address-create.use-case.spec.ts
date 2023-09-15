import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { AddressCreateUseCase } from './address-create.use-case';
import { addressModuleMock } from '../../address.module';
import { addressMock, createAddressInputMock } from 'src/domain/mocks';

describe('AddressCreateUseCase', () => {
  let usecase: AddressCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(addressModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<AddressCreateUseCase>(AddressCreateUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should create', async () => {
    const createSpy = jest
      .spyOn(prismaService.address, 'create')
      .mockResolvedValue(addressMock);

    const response = await usecase.execute(createAddressInputMock);

    expect(response).toStrictEqual(addressMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createAddressInputMock,
        deletedAt: null,
      },
    });
  });
});
