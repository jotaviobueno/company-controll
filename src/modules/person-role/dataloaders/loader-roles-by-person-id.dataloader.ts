import { Injectable } from '@nestjs/common';
import DataLoader = require('dataloader');
import { IBaseDataloader } from 'src/domain/base';
import { RoleEntity } from 'src/domain/entities';
import { PersonRoleFindManyWithPersonIdUseCase } from '../use-cases';
import { RoleFindManyWithIdsUseCase } from 'src/modules/role/use-cases';

@Injectable()
export class LoaderRolesByPersonId
  implements IBaseDataloader<string, RoleEntity>
{
  dataLoader: DataLoader<string, RoleEntity[]>;

  constructor(
    private readonly personRoleFindManyWithPersonIdUseCase: PersonRoleFindManyWithPersonIdUseCase,
    private readonly roleFindManyWithIdsUseCase: RoleFindManyWithIdsUseCase,
  ) {
    this.dataLoader = new DataLoader<string, RoleEntity[]>(
      (keys) => this.batch([...keys]),
      {
        cache: true,
      },
    );
  }

  async batch(data: string[]): Promise<RoleEntity[][]> {
    const personsRoles =
      await this.personRoleFindManyWithPersonIdUseCase.execute(data);

    const rolesIds = personsRoles.map((personRole) => personRole.roleId);

    const roles = await this.roleFindManyWithIdsUseCase.execute(rolesIds);

    const roleMap: Record<string, RoleEntity[]> = {};

    personsRoles.forEach((personRole) => {
      roles.forEach((role) => {
        if (!roleMap[personRole.personId]) roleMap[personRole.personId] = [];

        if (role.id === personRole.roleId)
          roleMap[personRole.personId].push(role);
      });
    });

    return data.map((id) => roleMap[id] ?? []);
  }

  load(data: string): Promise<RoleEntity[]> {
    return this.dataLoader.load(data);
  }
}
