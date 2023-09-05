import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PersonRoleInput } from 'src/domain/dtos';
import { PersonRoleEntity } from 'src/domain/entities';
import { PersonFindOneUseCase } from 'src/modules/person/use-cases';
import { RoleFindOneUseCase } from 'src/modules/role/use-cases';
import { IPersonRoleRepository } from 'src/repositories/person-role';

@Injectable()
export class PersonRoleRemoveRoleUseCase
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

    const personHaveThisRole =
      await this.personRoleRepository.findByPersonIdAndRoleId({
        roleId: role.id,
        personId: person.id,
      });

    if (!personHaveThisRole)
      throw new HttpException(
        'Person dont have this role',
        HttpStatus.CONFLICT,
      );

    const remove = await this.personRoleRepository.delete(
      personHaveThisRole.id,
    );

    if (!remove)
      throw new HttpException(
        'failed to remove user role',
        HttpStatus.NOT_ACCEPTABLE,
      );

    return remove;
  }
}
