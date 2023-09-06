import { registerEnumType } from '@nestjs/graphql';

export enum STOCK_TYPE_STATUS {
  INCOME = 'INCOME',
  OUTCOME = 'OUTCOME',
}

registerEnumType(STOCK_TYPE_STATUS, {
  name: 'StockTypeStatus',
});
