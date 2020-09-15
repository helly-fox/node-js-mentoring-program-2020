import UserModel from "src/models";

export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
}

export interface UserServiceInterface {
  getById(userId: string): Promise<UserModel | null>;
  getList(loginSubstring: string, limit: number): Promise<UserModel[]>;
  create(user: Omit<User, 'id'>): Promise<UserModel>;
  update(userId: string, user: Omit<Partial<User>, 'id'>): Promise<number | UserModel[]>;
  delete(userId: string): Promise<number>;
}
