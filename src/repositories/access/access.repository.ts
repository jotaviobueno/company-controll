import { Injectable } from '@nestjs/common';
import { AccessEntity } from 'src/domain/entities';
import { IAccessRepository } from './iaccess.repository';

@Injectable()
export class AccessRepository extends IAccessRepository {
  //create(createDto: Omit<CreateAccessInput, 'code'>): Promise<AccessEntity> {
  //  return this.prismaService.access.create({
  //    data: {
  //      ...createDto,
  //    },
  //  });
  //}

  findByToken(token: string): Promise<AccessEntity> {
    return this.prismaService.access.findFirst({
      where: {
        token,
      },
    });
  }
}
