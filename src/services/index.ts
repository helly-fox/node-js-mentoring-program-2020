import { v4 as uuid } from 'uuid';
import { sortBy, pipe, prop, filter, includes, take, find, findIndex } from 'ramda';
import Index from '../models';

const NULL_INDEX = -1;
const MAX_ITEMS_LENGTH = 8;

class UserService {
  users: Index[];

  constructor() {
    this.users = [];
  }

  getUserById(userId: string) {
    return find((u: Index) => u.id === userId)(this.users);
  }

  getUserList(loginSubstring: string = '', limit: number = MAX_ITEMS_LENGTH) {
    return pipe(
      loginSubstring ? filter((u: Index) => includes(loginSubstring, u.login)) : (arr: Index[]) => arr,
      sortBy(prop('login')),
      take(limit)
    )(this.users);
  }

  createUser(user: Omit<Index, 'id' | 'isDeleted'>) {
    const newUser = {
      id: uuid(),
      isDeleted: false,
      ...user,
    };

    this.users.push(newUser);

    return newUser;
  }

  updateUser(userId: string, user: Omit<Partial<Index>, 'id'>) {
    const userIndex = findIndex(({ id }: Index) => userId === id)(this.users);

    if (userIndex === NULL_INDEX) return null;

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...user,
    };

    return this.users[userIndex];
  }

  deleteUser(userId: string) {
    const userIndex = this.users.findIndex(({ id }: Index) => id === userId);

    if (userIndex === NULL_INDEX) return null;

    this.users[userIndex].isDeleted = true;

    return this.users[userIndex];
  }
}

const service = new UserService();

export default service;
