import { Injectable } from '@nestjs/common';
import { CreateAccessInput } from 'src/domain/dtos';
import { AccessEntity } from 'src/domain/entities';
import { IAccessRepository } from './iaccess.repository';
import { PrismaService } from 'src/db/prisma.service';
import { UpdateAccessInput } from 'src/domain/dtos/access/update-access.input';

@Injectable()
export class AccessRepository implements Partial<IAccessRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Omit<CreateAccessInput, 'code'>): Promise<AccessEntity> {
    return this.prismaService.access.create({
      data: {
        ...createDto,
      },
    });
  }

  findById(id: string): Promise<AccessEntity> {
    return this.prismaService.access.findFirst({ where: { id } });
  }

  findByToken(token: string): Promise<AccessEntity> {
    return this.prismaService.access.findFirst({
      where: {
        token,
      },
    });
  }

  update({ id, ...updateDto }: UpdateAccessInput): Promise<AccessEntity> {
    return this.prismaService.access.update({
      where: {
        id,
      },
      data: {
        ...updateDto,
        updatedAt: new Date(),
      },
    });
  }
}
