import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import { personModuleMock } from '../../person.module';
import { personMock } from 'src/domain/mocks';
import { PersonSoftDeleteUseCase } from './person-soft-delete.use-case';

describe('PersonSoftDeleteUseCase', () => {
  let usecase: PersonSoftDeleteUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(personModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonSoftDeleteUseCase>(PersonSoftDeleteUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should update', async () => {
    jest.spyOn(prismaService.person, 'findFirst').mockResolvedValue(personMock);

    const updateSpy = jest
      .spyOn(prismaService.person, 'update')
      .mockResolvedValue(personMock);

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
    jest.spyOn(prismaService.person, 'findFirst').mockResolvedValue(personMock);

    jest.spyOn(prismaService.person, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
