import { Injectable } from '@nestjs/common';
import { IPersonRepository } from './iperson.repository';
import { PersonEntity } from 'src/domain/entities';

@Injectable()
export class PersonRepository extends IPersonRepository {
  findByAccessId(accessId: string): Promise<PersonEntity> {
    return this.prismaService.person.findFirst({
      where: {
        accessId,
        deletedAt: null,
      },
    });
  }
}
