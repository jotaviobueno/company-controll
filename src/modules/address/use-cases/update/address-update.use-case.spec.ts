import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { AddressUpdateUseCase } from '.';
import { HttpException } from '@nestjs/common';
import { addressModuleMock } from '../../address.module';
import { addressMock, updateAddressInputMock } from 'src/domain/mocks';

describe('AddressUpdateUseCase', () => {
  let usecase: AddressUpdateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(addressModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<AddressUpdateUseCase>(AddressUpdateUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should update', async () => {
    jest
      .spyOn(prismaService.address, 'findFirst')
      .mockResolvedValue(addressMock);

    const updateSpy = jest
      .spyOn(prismaService.address, 'update')
      .mockResolvedValue(addressMock);

    const response = await usecase.execute(updateAddressInputMock);

    expect(response).toStrictEqual(addressMock);
    expect(updateSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        ...updateAddressInputMock,
        updatedAt: expect.any(Date),
      },
    });
  });

  it('Should throw an error when failed to update', async () => {
    jest
      .spyOn(prismaService.address, 'findFirst')
      .mockResolvedValue(addressMock);

    jest.spyOn(prismaService.address, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute(updateAddressInputMock)).rejects.toThrow(
      HttpException,
    );

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
