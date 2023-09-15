import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import { addressMock, personAddressMock } from 'src/domain/mocks';
import { PersonAddressSoftDeleteUseCase } from './person-address-soft-delete.use-case';
import { personAddressModuleMock } from '../../person-address.module';

describe('PersonAddressSoftDeleteUseCase', () => {
  let usecase: PersonAddressSoftDeleteUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      personAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonAddressSoftDeleteUseCase>(
      PersonAddressSoftDeleteUseCase,
    );
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
      .spyOn(prismaService.personAddress, 'findFirst')
      .mockResolvedValue(personAddressMock);

    jest
      .spyOn(prismaService.address, 'findFirst')
      .mockResolvedValue(addressMock);

    jest.spyOn(prismaService.address, 'update').mockResolvedValue(addressMock);

    const updateSpy = jest
      .spyOn(prismaService.personAddress, 'update')
      .mockResolvedValue(personAddressMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(true);
    expect(updateSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        updatedAt: expect.any(Date),
        deletedAt: expect.any(Date),
      },
    });
  });

  it('Should throw an error when failed to update', async () => {
    jest
      .spyOn(prismaService.personAddress, 'findFirst')
      .mockResolvedValue(personAddressMock);

    jest
      .spyOn(prismaService.address, 'findFirst')
      .mockResolvedValue(addressMock);

    jest.spyOn(prismaService.address, 'update').mockResolvedValue(addressMock);

    jest.spyOn(prismaService.personAddress, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
