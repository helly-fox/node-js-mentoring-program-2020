import { UserService } from 'src/services';
import * as controller from '../user';
import { STATUS } from '../../constants';

jest.mock('src/services');
const resMock = {
  json: jest.fn(),
  send: jest.fn(),
  status: jest.fn(() => ({
    json: jest.fn(),
  })),
};

describe('user controller', () => {
  describe('getUserList', () => {
    test('should return group list', async () => {
      const reqMock = {
        query: {
          loginSubstring: '',
          limit: '4',
        },
      };
      const spy = jest.spyOn(UserService, 'getList');

      await controller.getUserList(reqMock, resMock);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith('', 4);
      expect(resMock.json).toBeCalledTimes(1);
    });

    test('should catch error', async () => {
      const spy = jest.spyOn(UserService, 'getList');
      const nextMock = jest.fn();

      await controller.getUserList(null, resMock, nextMock);

      expect(spy).toBeCalledTimes(0);
      expect(resMock.json).toBeCalledTimes(0);
      expect(nextMock).toBeCalledTimes(1);
    });
  });

  describe('createUser', () => {
    test('should create new group', async () => {
      const testReq = {
        body: {
          login: 'test',
          password: 'TEST',
          age: 12,
        },
      };
      const spy = jest.spyOn(UserService, 'create');

      await controller.createUser(testReq, resMock);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(testReq.body);
      expect(resMock.json).toBeCalledTimes(1);
    });

    test('should throw error', async () => {
      const spy = jest.spyOn(UserService, 'create');
      const nextMock = jest.fn();

      await controller.createUser(null, resMock, nextMock);

      expect(spy).toBeCalledTimes(0);
      expect(resMock.json).toBeCalledTimes(0);
      expect(nextMock).toBeCalledTimes(1);
    });
  });

  describe('updateUser', () => {
    test('successfully update', async () => {
      const userBody = {
        login: 'test',
        password: 'test',
      };
      const reqMock = { params: { userId: 'test' }, body: userBody };
      const spy = jest.spyOn(UserService, 'update');

      await controller.updateUser(reqMock, resMock);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith('test', userBody);
      expect(resMock.json).toBeCalledTimes(1);
    });

    test('should not find user for update', async () => {
      const userBody = {
        login: 'test',
        password: 'test',
      };
      const reqMock = { params: { userId: 'testUser' }, body: userBody };
      const spy = jest.spyOn(UserService, 'update');

      await controller.updateUser(reqMock, resMock);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith('testUser', userBody);
      expect(resMock.json).toBeCalledTimes(0);
      expect(resMock.status).toBeCalledTimes(1);
      expect(resMock.status).toBeCalledWith(STATUS.NOT_FOUND);
    });

    test('should catch error', async () => {
      const spy = jest.spyOn(UserService, 'update');
      const nextMock = jest.fn();

      await controller.updateUser(null, resMock, nextMock);

      expect(spy).toBeCalledTimes(0);
      expect(nextMock).toBeCalledTimes(1);
    });
  });

  describe('deleteUser', () => {
    test('should successfully remove user', async () => {
      const reqMock = {
        params: {
          userId: 'test',
        },
      };
      const spy = jest.spyOn(UserService, 'delete');

      await controller.deleteUser(reqMock, resMock);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith('test');
      expect(resMock.send).toBeCalledTimes(1);
      expect(resMock.send).toBeCalledWith(`User with test ID is successfully removed`);
    });
    test('should not find user', async () => {
      const reqMock = {
        params: {
          userId: 'test1',
        },
      };
      const spy = jest.spyOn(UserService, 'delete');

      await controller.deleteUser(reqMock, resMock);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith('test1');
      expect(resMock.send).toBeCalledTimes(0);
      expect(resMock.status).toBeCalledTimes(1);
      expect(resMock.status).toBeCalledWith(STATUS.NOT_FOUND);
    });
    test('should catch errors', async () => {
      const spy = jest.spyOn(UserService, 'delete');
      const nextMock = jest.fn();

      await controller.deleteUser(null, resMock, nextMock);

      expect(spy).toBeCalledTimes(0);
      expect(nextMock).toBeCalledTimes(1);
    });
  });

  describe('getUserById', () => {
    test('should get user by id', async () => {
      const reqMock = {
        params: {
          userId: 'test',
        },
      };
      const spy = jest.spyOn(UserService, 'getById');

      await controller.getUserById(reqMock, resMock);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith('test');
      expect(resMock.json).toBeCalledTimes(1);
    });
    test('not find user by id', async () => {
      const reqMock = {
        params: {
          userId: 'test1',
        },
      };
      const spy = jest.spyOn(UserService, 'getById');

      await controller.getUserById(reqMock, resMock);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith('test1');
      expect(resMock.json).toBeCalledTimes(0);
      expect(resMock.status).toBeCalledTimes(1);
      expect(resMock.status).toBeCalledWith(STATUS.NOT_FOUND);
    });
    test('should catch errors', async () => {
      const spy = jest.spyOn(UserService, 'getById');
      const nextMock = jest.fn();

      await controller.getUserById(null, resMock, nextMock);

      expect(spy).toBeCalledTimes(0);
      expect(nextMock).toBeCalledTimes(1);
    });
  });
});
