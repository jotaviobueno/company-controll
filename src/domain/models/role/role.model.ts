export interface IRoleModel {
  name: string;
  permissions: string[];
}

export const RoleModel = [
  {
    name: 'ADMIN',
    permissions: [
      'CAN_READ_ROLE',
      'CAN_UPDATE_ROLE',
      'CAN_ASSIGN_USER_ROLE',
      'CAN_REMOVE_USER_ROLE',
    ],
  },
  {
    name: 'MOD',
    permissions: [],
  },
  {
    name: 'FINANCE',
    permissions: [],
  },
  {
    name: 'PROFESSOR',
    permissions: [],
  },
  {
    name: 'STUDENT',
    permissions: [],
  },
  {
    name: 'USER',
    permissions: [],
  },
];
