import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PersonRoleInput } from 'src/domain/dtos';
import { PersonRoleEntity } from 'src/domain/entities';
import { PersonFindOneUseCase } from 'src/modules/person/use-cases';
import { RoleFindOneUseCase } from 'src/modules/role/use-cases';
import { IPersonRoleRepository } from 'src/repositories/person-role';

@Injectable()
export class PersonRoleAssigRoleUseCase
  implements IBaseUseCase<PersonRoleInput, PersonRoleEntity>
{
  constructor(
    private readonly personFindOneUseCase: PersonFindOneUseCase,
    private readonly roleFindOneUseCase: RoleFindOneUseCase,
    private readonly personRoleRepository: IPersonRoleRepository,
  ) {}

  async execute(data: PersonRoleInput): Promise<PersonRoleEntity> {
    const person = await this.personFindOneUseCase.execute(data.personId);

    const role = await this.roleFindOneUseCase.execute(data.roleId);

    const userAreadyThisRole =
      await this.personRoleRepository.findByPersonIdAndRoleId({
        roleId: role.id,
        personId: person.id,
      });

    if (userAreadyThisRole)
      throw new HttpException('Person already this role', HttpStatus.CONFLICT);

    const personRole = await this.personRoleRepository.create({
      roleId: role.id,
      personId: person.id,
    });

    return personRole;
  }
}
