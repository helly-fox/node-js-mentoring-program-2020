import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/services/index';

type Auth = { token: string };

export interface AuthServiceInterface {
  login(userName: string, password: string): Promise<Auth | null>;
}

class AuthService implements AuthServiceInterface {
  // eslint-disable-next-line class-methods-use-this
  public async login(userName: string, password: string): Promise<Auth | null> {
    const user = await UserService.getByName(userName);

    if (!user || user.password !== password) {
      return null;
    }

    return {
      token: jwt.sign({ userName }, process.env.SECRET as string, { expiresIn: 100000 }),
    };
  }
}

const service = new AuthService();

export default service;
