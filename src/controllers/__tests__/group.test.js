import { GroupService } from 'src/services';
import * as controller from '../group';
import { STATUS } from '../../constants';

jest.mock('src/services');
const resMock = {
  json: jest.fn(),
  send: jest.fn(),
  status: jest.fn(() => ({
    json: jest.fn(),
  })),
};

describe('group controller', () => {
  describe('getGroupList', () => {
    test('should return group list', async () => {
      const spy = jest.spyOn(GroupService, 'getList');

      await controller.getGroupList({}, resMock);

      expect(spy).toBeCalledTimes(1);
      expect(resMock.json).toBeCalledTimes(1);
    });
  });

  describe('createGroup', () => {
    test('should create new group', async () => {
      const testReq = {
        body: {
          name: 'test',
          permissions: 'TEST',
        },
      };
      const spy = jest.spyOn(GroupService, 'create');

      await controller.createGroup(testReq, resMock);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(testReq.body);
      expect(resMock.json).toBeCalledTimes(1);
    });

    test('should throw error', async () => {
      const spy = jest.spyOn(GroupService, 'create');
      const nextMock = jest.fn();

      await controller.createGroup(null, resMock, nextMock);

      expect(spy).toBeCalledTimes(0);
      expect(resMock.json).toBeCalledTimes(0);
      expect(nextMock).toBeCalledTimes(1);
    });
  });

  describe('updateGroup', () => {
    test('successfully update', async () => {
      const groupBody = {
        name: 'test',
        permissions: 'test',
      };
      const reqMock = { params: { groupId: 'test' }, body: groupBody };
      const spy = jest.spyOn(GroupService, 'update');

      await controller.updateGroup(reqMock, resMock);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith('test', groupBody);
      expect(resMock.json).toBeCalledTimes(1);
    });

    test('should not find group for update', async () => {
      const groupBody = {
        name: 'test',
        permissions: 'test',
      };
      const reqMock = { params: { groupId: 'testGroup' }, body: groupBody };
      const spy = jest.spyOn(GroupService, 'update');
      const nextMock = jest.fn();

      await controller.updateGroup(reqMock, resMock, nextMock);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith('testGroup', groupBody);
      expect(resMock.json).toBeCalledTimes(0);
      expect(resMock.status).toBeCalledTimes(1);
      expect(resMock.status).toBeCalledWith(STATUS.NOT_FOUND);
    });

    test('should catch error', async () => {
      const spy = jest.spyOn(GroupService, 'update');
      const nextMock = jest.fn();

      await controller.updateGroup(null, resMock, nextMock);

      expect(spy).toBeCalledTimes(0);
      expect(nextMock).toBeCalledTimes(1);
    });
  });

  describe('deleteGroup', () => {
    test('should successfully remove group', async () => {
      const reqMock = {
        params: {
          groupId: 'test',
        },
      };
      const spy = jest.spyOn(GroupService, 'delete');

      await controller.deleteGroup(reqMock, resMock);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith('test');
      expect(resMock.send).toBeCalledTimes(1);
      expect(resMock.send).toBeCalledWith(`Group with test ID is successfully removed`);
    });
    test('should not find group', async () => {
      const reqMock = {
        params: {
          groupId: 'test1',
        },
      };
      const spy = jest.spyOn(GroupService, 'delete');

      await controller.deleteGroup(reqMock, resMock);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith('test1');
      expect(resMock.send).toBeCalledTimes(0);
      expect(resMock.status).toBeCalledTimes(1);
      expect(resMock.status).toBeCalledWith(STATUS.NOT_FOUND);
    });
    test('should catch errors', async () => {
      const spy = jest.spyOn(GroupService, 'delete');
      const nextMock = jest.fn();

      await controller.deleteGroup(null, resMock, nextMock);

      expect(spy).toBeCalledTimes(0);
      expect(nextMock).toBeCalledTimes(1);
    });
  });

  describe('assignGroup', () => {
    test('should assign group to user', async () => {
      const reqMock = {
        body: {
          groupId: 'test',
          userIds: 'test',
        },
      };
      const spy = jest.spyOn(GroupService, 'addUsersToGroup');

      await controller.assignGroup(reqMock, resMock);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith('test', 'test');
      expect(resMock.json).toBeCalledTimes(1);
    });
    test('should not find group', async () => {
      const reqMock = {
        body: {
          groupId: 'test1',
          userIds: 'test',
        },
      };
      const spy = jest.spyOn(GroupService, 'addUsersToGroup');

      await controller.assignGroup(reqMock, resMock);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith('test1', 'test');
      expect(resMock.json).toBeCalledTimes(0);
      expect(resMock.status).toBeCalledTimes(1);
      expect(resMock.status).toBeCalledWith(STATUS.NOT_FOUND);
    });
    test('should catch errors', async () => {
      const spy = jest.spyOn(GroupService, 'addUsersToGroup');
      const nextMock = jest.fn();

      await controller.assignGroup(null, resMock, nextMock);

      expect(spy).toBeCalledTimes(0);
      expect(nextMock).toBeCalledTimes(1);
    });
  });
});
