import { registerEnumType } from '@nestjs/graphql';

export enum ACCESS_PROVIDER {
  GOOGLE = 'GOOGLE',
  ACCESS_DEV = 'ACCESS_DEV',
}

registerEnumType(ACCESS_PROVIDER, {
  name: 'AccessProvider',
});
