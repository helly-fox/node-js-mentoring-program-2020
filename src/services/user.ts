import { v4 as uuid } from 'uuid';
import { Op } from 'sequelize';
import { User, UserInstance } from '../types';
import { models } from '../db';

const MAX_ITEMS_LENGTH = 8;
const { UserModel } = models;

export interface UserServiceInterface {
  getById(userId: string): Promise<UserInstance | null>;
  getList(loginSubstring: string, limit: number): Promise<UserInstance[]>;
  create(user: Omit<User, 'id'>): Promise<UserInstance>;
  update(userId: string, user: Omit<Partial<User>, 'id'>): Promise<number | UserInstance[]>;
  delete(userId: string): Promise<number>;
  getByIds(userIds: string[]): Promise<UserInstance[] | null>;
  getByName(name: string): Promise<UserInstance | null>;
}

class UserService implements UserServiceInterface {
  // eslint-disable-next-line class-methods-use-this
  public getById(userId: string): Promise<UserInstance | null> {
    return UserModel.findOne({ where: { id: userId } });
  }

  // eslint-disable-next-line class-methods-use-this
  public getList(loginSubstring: string = '', limit: number = MAX_ITEMS_LENGTH): Promise<UserInstance[]> {
    return UserModel.findAll({
      ...(loginSubstring && { where: { login: { [Op.startsWith]: loginSubstring } } }),
      raw: true,
      limit,
      order: [ 'login' ],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public getByIds(userIds: string[]): Promise<UserInstance[]> {
    return UserModel.findAll({ where: { id: userIds } });
  }

  // eslint-disable-next-line class-methods-use-this
  public create(user: Omit<User, 'id'>): Promise<UserInstance> {
    return UserModel.create({
      id: uuid(),
      ...user,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public update(userId: string, user: Omit<Partial<User>, 'id'>): Promise<number | UserInstance[]> {
    return UserModel.update(user, {
      where: {
        id: userId,
      },
    }).then((updatedUser) => updatedUser[0]);
  }

  // eslint-disable-next-line class-methods-use-this
  public delete(userId: string): Promise<number> {
    return UserModel.destroy({
      where: {
        id: userId,
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public getByName(name: string): Promise<UserInstance | null> {
    return UserModel.findOne({ where: { login: name } });
  }
}

const service = new UserService();

export default service;
