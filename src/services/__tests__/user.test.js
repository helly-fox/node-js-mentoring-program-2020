import UserService from '../user';

jest.mock('../../db', () => ({
  models: {
    UserModel: {
      findOne: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn((id, user) => Promise.resolve([ { id, ...user } ])),
      destroy: jest.fn(),
    },
  },
}));
const { models } = require('../../db');

describe('UserService', () => {
  describe('getById', () => {
    test('should trigger findOne with passed pros', async () => {
      const testId = 'testId';

      await UserService.getById(testId);

      expect(models.UserModel.findOne).toBeCalledWith({ where: { id: testId } });
    });
  });

  describe('getList', () => {
    test('should get all list with default amount', async () => {
      const testId = 'testId';

      await UserService.getList();

      expect(models.UserModel.findAll).toBeCalledWith({
        raw: true,
        limit: 8,
        order: [ 'login' ],
      });
    });

    test('should get list starting with substring and return certain amount', async () => {
      const testId = 'testId';
      const number = 2;

      await UserService.getList(testId, number);

      expect(models.UserModel.findAll.mock.calls[0]).toMatchObject([
        {
          where: {
            login: {
              [Symbol('startsWith')]: 'testId',
            },
          },
          raw: true,
          limit: number,
          order: [ 'login' ],
        },
      ]);
    });
  });

  describe('create', () => {
    test('should trigger model creation', async () => {
      const testUser = {
        login: 'test',
        password: 'test',
        age: 12,
      };

      await UserService.create(testUser);

      expect(models.UserModel.create).toBeCalledTimes(1);
      expect(models.UserModel.create.mock.calls[0][0].login).toEqual(testUser.login);
      expect(models.UserModel.create.mock.calls[0][0].password).toEqual(testUser.password);
      expect(models.UserModel.create.mock.calls[0][0].age).toEqual(testUser.age);
      expect(models.UserModel.create.mock.calls[0][0].id).toBeDefined();
    });
  });

  describe('update', () => {
    test('should update the model', async () => {
      const userId = 'test';
      const testUser = {
        login: 'test',
        password: 'test',
        age: 12,
      };

      await UserService.update(userId, testUser);

      expect(models.UserModel.update).toBeCalledTimes(1);
      expect(models.UserModel.update).toBeCalledWith(testUser, { where: { id: userId } });
    });
  });

  describe('delete', () => {
    test('should trigger destroy', async () => {
      const userId = 'test';

      await UserService.delete(userId);

      expect(models.UserModel.destroy).toBeCalledTimes(1);
      expect(models.UserModel.destroy).toBeCalledWith({ where: { id: userId } });
    });
  });

  describe('getByIds', () => {
    test('should get items by ids', async () => {
      const userIds = [ 'test1', 'test2' ];

      await UserService.getByIds(userIds);

      expect(models.UserModel.findAll).toBeCalledTimes(1);
      expect(models.UserModel.findAll).toBeCalledWith({ where: { id: userIds } });
    });
  });

  describe('getByName', () => {
    test('should get items by name', async () => {
      const name = 'test';

      await UserService.getByName(name);

      expect(models.UserModel.findOne).toBeCalledTimes(1);
      expect(models.UserModel.findOne).toBeCalledWith({ where: { login: name } });
    });
  });
});
