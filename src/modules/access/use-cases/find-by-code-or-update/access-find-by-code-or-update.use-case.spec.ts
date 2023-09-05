import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { AccessFindByCodeOrUpdateUseCase } from './access-find-by-code-or-update.use-case';
import { accessModuleMock } from '../../access.module';
import { accessMock } from 'src/domain/mocks';

describe('AccessFindByCodeOrUpdateUseCase', () => {
  let usecase: AccessFindByCodeOrUpdateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(accessModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<AccessFindByCodeOrUpdateUseCase>(
      AccessFindByCodeOrUpdateUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should update', async () => {
    jest.spyOn(prismaService.access, 'findFirst').mockResolvedValue(accessMock);

    const updateRemove = jest
      .spyOn(prismaService.access, 'update')
      .mockResolvedValue(accessMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(accessMock);
    expect(updateRemove).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        updatedAt: expect.any(Date),
      },
    });
  });
});
