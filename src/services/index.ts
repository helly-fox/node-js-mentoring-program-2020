import { v4 as uuid } from 'uuid';
import { Op } from 'sequelize';
import UserModel from '../models';
import { User, UserServiceInterface } from '../types';

const MAX_ITEMS_LENGTH = 8;

class UserService implements UserServiceInterface {

  // eslint-disable-next-line class-methods-use-this
  public getById(userId: string): Promise<UserModel | null> {
    return UserModel.findOne({ where: { id: userId } });
  }

  // eslint-disable-next-line class-methods-use-this
  public getList(loginSubstring: string = '', limit: number = MAX_ITEMS_LENGTH): Promise<UserModel[]> {
    return UserModel.findAll({
      ...(loginSubstring && { where: { login: { [Op.startsWith]: loginSubstring } } }),
      raw: true,
      limit,
      order: [ 'login' ],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public create(user: Omit<User, 'id'>): Promise<UserModel> {
    return UserModel.create({
      id: uuid(),
      ...user,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public update(userId: string, user: Omit<Partial<User>, 'id'>): Promise<number | UserModel[]> {
    return UserModel.update(user, {
      where: {
        id: userId,
      },
    }).then(updatedUser => updatedUser[0]);
  }

  // eslint-disable-next-line class-methods-use-this
  public delete(userId: string): Promise<number> {
    return UserModel.destroy({
      where: {
        id: userId,
      },
    });
  }
}

const service = new UserService();

export default service;
