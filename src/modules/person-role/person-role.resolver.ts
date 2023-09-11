import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PersonRoleInput } from 'src/domain/dtos';
import { PersonRoleEntity } from 'src/domain/entities';
import {
  PersonRoleAssigRoleUseCase,
  PersonRoleRemoveRoleUseCase,
} from './use-cases';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../role/decorator';
import { PERMISSION, ROLE } from 'src/domain/enums';
import { Permissions } from '../permission/decorator';
import { RoleGuard } from '../access/guards';

@Resolver(() => PersonRoleEntity)
@UseGuards(RoleGuard)
@Roles(ROLE.ADMIN)
export class PersonRoleResolver {
  constructor(
    private readonly personRoleAssignRoleUseCase: PersonRoleAssigRoleUseCase,
    private readonly personRoleRemoveRoleUseCase: PersonRoleRemoveRoleUseCase,
  ) {}

  @Mutation(() => PersonRoleEntity)
  @Permissions(PERMISSION.CAN_ASSIGN_USER_ROLE)
  assignPersonRole(@Args('personRoleInput') personRoleInput: PersonRoleInput) {
    return this.personRoleAssignRoleUseCase.execute(personRoleInput);
  }

  @Mutation(() => PersonRoleEntity)
  @Permissions(PERMISSION.CAN_REMOVE_USER_ROLE)
  removePersonRole(@Args('personRoleInput') personRoleInput: PersonRoleInput) {
    return this.personRoleRemoveRoleUseCase.execute(personRoleInput);
  }
}
