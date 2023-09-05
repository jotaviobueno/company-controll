import { SetMetadata } from '@nestjs/common';
import { ROLE } from 'src/domain/enums';

export const ROLE_KEY = 'roles';
export const Roles = (...roles: ROLE[]) => SetMetadata(ROLE_KEY, roles);
