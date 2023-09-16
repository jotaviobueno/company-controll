import { registerEnumType } from '@nestjs/graphql';

export enum TEAM_REQUEST_STATUS {
  PENDING = 'PENDING',
  ACCEPT = 'ACCEPT',
  REFUSED = 'REFUSED',
  CANCELED = 'CANCELED',
}

registerEnumType(TEAM_REQUEST_STATUS, {
  name: 'TeamRequestStatus',
});
