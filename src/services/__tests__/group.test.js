import GroupService from '../group';

jest.mock('../../db', () => ({
  models: {
    GroupModel: {
      findOne: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn((id, group) => Promise.resolve([{ id, ...group }])),
      destroy: jest.fn(),
    },
  },
}));
const { models } = require('../../db');

describe('GroupService', () => {
  describe('getById', () => {
    test('should trigger findOne with passed pros', async () => {
      const testId = 'testId';

      await GroupService.getById(testId);

      expect(models.GroupModel.findOne).toBeCalledWith({ where: { id: testId } });
    });
  });

  describe('getList', () => {
    test('should get all list with default amount', async () => {
      await GroupService.getList();

      expect(models.GroupModel.findAll).toBeCalledWith({
        raw: true
      });
    });
  });

  describe('create', () => {
    test('should trigger model creation', async () => {
      const testGroup = {
        name: 'test',
        permission: 'READ'
      };

      await GroupService.create(testGroup);

      expect(models.GroupModel.create).toBeCalledTimes(1);
      expect(models.GroupModel.create.mock.calls[0][0].name).toEqual(testGroup.name);
      expect(models.GroupModel.create.mock.calls[0][0].permission).toEqual(testGroup.permission);
      expect(models.GroupModel.create.mock.calls[0][0].id).toBeDefined();
    });
  });

  describe('update', () => {
    test('should update the model', async () => {
      const groupId = 'test';
      const testGroup = {
        name: 'test',
        permission: 'READ',
      };

      await GroupService.update(groupId, testGroup);

      expect(models.GroupModel.update).toBeCalledTimes(1);
      expect(models.GroupModel.update).toBeCalledWith(testGroup, { where: { id: groupId } });
    });
  });

  describe('delete', () => {
    test('should trigger destroy', async () => {
      const groupId = 'test';

      await GroupService.delete(groupId);

      expect(models.GroupModel.destroy).toBeCalledTimes(1);
      expect(models.GroupModel.destroy).toBeCalledWith({ where: { id: groupId } });
    });
  });
});
