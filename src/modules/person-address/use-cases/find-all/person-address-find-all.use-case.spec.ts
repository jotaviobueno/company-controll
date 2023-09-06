import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import {
  paginationOptionsInputMock,
  personAddressMock,
} from 'src/domain/mocks';
import { personAddressModuleMock } from '../../person-address.module';
import { PersonAddressFindAllUseCase } from './person-address-find-all.use-case';

describe('PersonAddressFindAllUseCase', () => {
  let usecase: PersonAddressFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      personAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonAddressFindAllUseCase>(
      PersonAddressFindAllUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should findAll', async () => {
    const findAllSpy = jest
      .spyOn(prismaService.personAddress, 'findMany')
      .mockResolvedValue([personAddressMock]);

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([personAddressMock]);
    expect(findAllSpy).toHaveBeenCalledWith({
      where: {
        deletedAt: null,
      },
      skip:
        (paginationOptionsInputMock.page - 1) *
        paginationOptionsInputMock.per_page,
      take: paginationOptionsInputMock.per_page,
    });
  });
});
