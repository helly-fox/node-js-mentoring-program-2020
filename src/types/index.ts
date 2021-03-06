import { Model, Transaction } from 'sequelize';
import { PERMISSIONS } from '../constants';

export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
};

export type Permission = keyof typeof PERMISSIONS;

export interface Group {
  id: string;
  name: string;
  permission: Permission[];
}

export interface GroupUserInstance {
  userId: string;
  groupId: string;
}

export interface UserInstance extends Model<User>, User {
}
export interface GroupInstance extends Model<Group>, Group {
  addUsers: (user: UserInstance, options: { transaction: Transaction } ) => Promise<GroupUserInstance>
}
