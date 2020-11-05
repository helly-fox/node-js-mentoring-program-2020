import { NextFunction, Request, Response } from 'express';
import { GroupService } from 'src/services';
import { STATUS } from 'src/constants';

export const assignGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await GroupService.addUsersToGroup(req.body.groupId, req.body.userIds as string[]);

    if (result) {
      res.json(result);
    } else {
      res.status(STATUS.NOT_FOUND).json({
        status: 'failed',
        message: `Group with or users do not exist`,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const getGroupList = async (req: Request, res: Response) => {
  const groupList = await GroupService.getList();

  res.json(groupList);
};

export const createGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newGroup = await GroupService.create(req.body);

    res.json(newGroup);
  } catch (e) {
    next(e);
  }
};

export const getGroupById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const group = await GroupService.getById(req.params.groupId);

    if (group) {
      res.json(group);
    } else {
      res.status(STATUS.NOT_FOUND).json({
        status: 'failed',
        message: `Group with ${req.params.groupId} does not exists`,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const updateGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedGroup = await GroupService.update(req.params.groupId, req.body);

    if (updatedGroup) {
      res.json(updatedGroup);
    } else {
      res.status(STATUS.NOT_FOUND).json({
        status: 'failed',
        message: `Group with ${req.params.groupId} does not exists`,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const removedGroup = await GroupService.delete(req.params.groupId);

    if (removedGroup) {
      res.send(`Group with ${req.params.groupId} ID is successfully removed`);
    } else {
      res.status(STATUS.NOT_FOUND).json({
        status: 'failed',
        // @ts-ignore
        message: `Group with ${req.params.groupId} does not exists`,
      });
    }
  } catch (e) {
    next(e);
  }
};
