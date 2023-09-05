import { SetMetadata } from '@nestjs/common';
import { PERMISSION } from 'src/domain/enums';

export const PERMISSION_KEY = 'permissions';
export const Permissions = (...permissions: PERMISSION[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
