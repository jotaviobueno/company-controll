import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import {
  addressMock,
  createAddressInputMock,
  createPersonAddressInputMock,
  personAddressMock,
  personMock,
} from 'src/domain/mocks';
import { PersonAddressCreateUseCase } from './person-addres-create.use-case';
import { personAddressModuleMock } from '../../person-address.module';

describe('PersonAddressCreateUseCase', () => {
  let usecase: PersonAddressCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      personAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonAddressCreateUseCase>(
      PersonAddressCreateUseCase,
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
    jest.spyOn(prismaService.person, 'findFirst').mockResolvedValue(personMock);

    jest.spyOn(prismaService.address, 'create').mockResolvedValue(addressMock);

    const createSpy = jest
      .spyOn(prismaService.personAddress, 'create')
      .mockResolvedValue(personAddressMock);

    const response = await usecase.execute({
      personId: '1',
      ...createAddressInputMock,
    });

    expect(response).toStrictEqual(personAddressMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createPersonAddressInputMock,
        deletedAt: null,
      },
    });
  });
});
