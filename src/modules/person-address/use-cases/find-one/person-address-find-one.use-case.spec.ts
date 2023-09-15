import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import { personAddressMock } from 'src/domain/mocks';
import { PersonAddressFindOneUseCase } from './person-address-find-one.use-case';
import { personAddressModuleMock } from '../../person-address.module';

describe('PersonAddressFindOneUseCase', () => {
  let usecase: PersonAddressFindOneUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      personAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonAddressFindOneUseCase>(
      PersonAddressFindOneUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should findOne', async () => {
    const findOneSpy = jest
      .spyOn(prismaService.personAddress, 'findFirst')
      .mockResolvedValue(personAddressMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(personAddressMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found', async () => {
    jest
      .spyOn(prismaService.personAddress, 'findFirst')
      .mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
