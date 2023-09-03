import { registerEnumType } from '@nestjs/graphql';

export enum ACCESS_PROVIDER {
  GOOGLE = 'GOOGLE',
}

registerEnumType(ACCESS_PROVIDER, {
  name: 'AccessProvider',
});
