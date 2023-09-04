import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { AddressFindOneUseCase } from '../find-one';
import { HttpException } from '@nestjs/common';
import { addressMock } from 'src/domain/mocks';
import { addressModuleMock } from '../../address.module';

describe('AddressFindOneUseCase', () => {
  let usecase: AddressFindOneUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(addressModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<AddressFindOneUseCase>(AddressFindOneUseCase);
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
      .spyOn(prismaService.address, 'findFirst')
      .mockResolvedValue(addressMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(addressMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found address', async () => {
    jest.spyOn(prismaService.address, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
