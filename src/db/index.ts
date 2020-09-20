import { Sequelize } from 'sequelize';
import { UserModel, GroupModel, GroupUserModel } from '../models';

const sequelize = new Sequelize(process.env.DATABASE_URL as string);

const db = {
  GroupUserModel: GroupUserModel(sequelize),
  UserModel: UserModel(sequelize),
  GroupModel: GroupModel(sequelize),
  sequelize,
  Sequelize,
};

db.GroupModel.belongsToMany(db.UserModel, {
  through: db.GroupUserModel,
});
db.UserModel.belongsToMany(db.GroupModel, {
  through: db.GroupUserModel,
});

export const models = {
  GroupUserModel: db.GroupUserModel,
  UserModel: db.UserModel,
  GroupModel: db.GroupModel,
};

export default db;
