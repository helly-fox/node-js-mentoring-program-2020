import { v4 as uuid } from 'uuid';
import { UserService } from 'src/services/index';
import db, { models } from '../db';
import { Group, GroupInstance, GroupUserInstance } from '../types';

const { GroupModel } = models;

export interface GroupServiceInterface {
  getById(groupId: string): Promise<GroupInstance | null>;
  getList(loginSubstring: string, limit: number): Promise<GroupInstance[]>;
  create(grouop: Omit<Group, 'id'>): Promise<GroupInstance>;
  update(groupId: string, user: Omit<Partial<Group>, 'id'>): Promise<number | GroupInstance[]>;
  delete(groupId: string): Promise<number>;
  addUsersToGroup(groupId: string, userIds: string[]): Promise<GroupUserInstance[] | null>;
}

class GroupService implements GroupServiceInterface {
  // eslint-disable-next-line class-methods-use-this
  public getById(groupId: string): Promise<GroupInstance | null> {
    return GroupModel.findOne({ where: { id: groupId } });
  }

  // eslint-disable-next-line class-methods-use-this
  public getList(): Promise<GroupInstance[]> {
    return GroupModel.findAll({
      raw: true,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public create(user: Omit<Group, 'id'>): Promise<GroupInstance> {
    return GroupModel.create({
      id: uuid(),
      ...user,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public update(groupId: string, user: Omit<Partial<Group>, 'id'>): Promise<number | GroupInstance[]> {
    return GroupModel.update(user, {
      where: {
        id: groupId,
      },
    }).then((updatedGroup) => updatedGroup[0]);
  }

  // eslint-disable-next-line class-methods-use-this
  public delete(groupId: string): Promise<number> {
    return GroupModel.destroy({
      where: {
        id: groupId,
      },
    });
  }

  public async addUsersToGroup(groupId: string, userIds: string[]): Promise<GroupUserInstance[] | null> {
    const group = await this.getById(groupId);
    const users = await UserService.getByIds(userIds);

    if (users?.length && group) {
      return db.sequelize.transaction((t) =>
        Promise.all(users.map((user) => group.addUsers(user, { transaction: t })))
      );
    }

    return null;
  }
}

const service = new GroupService();

export default service;
