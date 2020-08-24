import { v4 as uuid } from 'uuid';
import { sortBy, pipe, prop, filter, includes, take, find, findIndex } from 'ramda';
import { User } from '../models';

const NULL_INDEX = -1;
const MAX_ITEMS_LENGTH = 8;

class UserService {
  private users: User[] = [];

  public getUserById(userId: string): User | undefined {
    return find((u: User) => u.id === userId && !u.isDeleted)(this.users);
  }

  public getUserList(loginSubstring: string = '', limit: number = MAX_ITEMS_LENGTH) {
    return pipe(
      loginSubstring ? filter((u: User) => includes(loginSubstring, u.login) && !u.isDeleted) : (arr: User[]) => arr,
      sortBy(prop('login')),
      take(limit)
    )(this.users);
  }

  public createUser(user: Omit<User, 'id' | 'isDeleted'>): User {
    const newUser = {
      id: uuid(),
      isDeleted: false,
      ...user,
    };

    this.users.push(newUser);

    return newUser;
  }

  public updateUser(userId: string, user: Omit<Partial<User>, 'id'>): User | null {
    const userIndex = findIndex(({ id, isDeleted }: User) => userId === id && !isDeleted)(this.users);

    if (userIndex === NULL_INDEX) return null;

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...user,
    };

    return this.users[userIndex];
  }

  public deleteUser(userId: string): User | null {
    const userIndex = this.users.findIndex(({ id, isDeleted }: User) => id === userId && !isDeleted);

    if (userIndex === NULL_INDEX) return null;

    this.users[userIndex].isDeleted = true;

    return this.users[userIndex];
  }
}

const service = new UserService();

export default service;
