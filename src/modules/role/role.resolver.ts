import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RoleEntity } from 'src/domain/entities';
import {
  RoleFindAllUseCase,
  RoleFindOneUseCase,
  RoleUpdateUseCase,
} from './use-cases';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../access/guards/auth.guard';
import { Roles } from './decorator';
import { RoleGuard } from '../person-role/guards';
import { PERMISSION, ROLE } from 'src/domain/enums';
import {
  IdInput,
  PaginationOptionsInput,
  UpdateRoleInput,
} from 'src/domain/dtos';
import { Permissions } from 'src/modules/permission/decorator';

@Resolver(() => RoleEntity)
@UseGuards(AuthGuard, RoleGuard)
@Roles(ROLE.ADMIN)
export class RoleResolver {
  constructor(
    private readonly roleFindAllUseCase: RoleFindAllUseCase,
    private readonly roleFindOneUseCase: RoleFindOneUseCase,
    private readonly roleUpdateUseCase: RoleUpdateUseCase,
  ) {}

  @Query(() => [RoleEntity])
  @Permissions(PERMISSION.CAN_READ_ROLE)
  findAllRoles(
    @Args('paginationOptionsInput')
    paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.roleFindAllUseCase.execute(paginationOptionsInput);
  }

  @Query(() => RoleEntity)
  @Permissions(PERMISSION.CAN_READ_ROLE)
  findOneRole(@Args('roleId') { id }: IdInput) {
    return this.roleFindOneUseCase.execute(id);
  }

  @Mutation(() => RoleEntity)
  @Permissions(PERMISSION.CAN_UPDATE_ROLE)
  updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.roleUpdateUseCase.execute(updateRoleInput);
  }
}
