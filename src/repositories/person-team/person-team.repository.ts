import { Injectable } from '@nestjs/common';
import { IPersonTeamRepository } from './iperson-team.repository';
import { CreatePersonTeamInput } from 'src/domain/dtos';
import { PersonTeamEntity } from 'src/domain/entities';

@Injectable()
export class PersonTeamRepository extends IPersonTeamRepository {
  findByPersonIdAndTeamId(
    personTeamInput: CreatePersonTeamInput,
  ): Promise<PersonTeamEntity> {
    return this.prismaService.personTeam.findFirst({
      where: {
        ...personTeamInput,
      },
    });
  }
}
