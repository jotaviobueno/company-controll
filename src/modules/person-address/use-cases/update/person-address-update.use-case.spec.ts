import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import {
  addressMock,
  personAddressMock,
  updatePersonAddressInputMock,
} from 'src/domain/mocks';
import { personAddressModuleMock } from '../../person-address.module';
import { PersonAddressUpdateUseCase } from './person-address.update.use-case';

describe('PersonAddressUpdateUseCase', () => {
  let usecase: PersonAddressUpdateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      personAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonAddressUpdateUseCase>(
      PersonAddressUpdateUseCase,
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
    const findOneSpy = jest
      .spyOn(prismaService.personAddress, 'findFirst')
      .mockResolvedValue(personAddressMock);

    jest
      .spyOn(prismaService.address, 'findFirst')
      .mockResolvedValue(addressMock);

    jest.spyOn(prismaService.address, 'update').mockResolvedValue(addressMock);

    const response = await usecase.execute(updatePersonAddressInputMock);

    expect(response).toStrictEqual(personAddressMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });
});
