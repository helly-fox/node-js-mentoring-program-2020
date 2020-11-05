import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/services';
import { STATUS } from 'src/constants';

export const getUserList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userList = await UserService.getList(
        req.query.loginSubstring as string,
        parseInt((req.query.limit as string) || '8', 10)
    );

    res.json(userList);
  } catch (e) {
    next(e);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.getById(req.params.userId);

    if (user) {
      res.json(user);
    } else {
      res.status(STATUS.NOT_FOUND).json({
        status: 'failed',
        message: `User with ${req.params.userId} does not exists`,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await UserService.create(req.body);

    res.json(newUser);
  } catch (e) {
    next(e);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await UserService.update(req.params.userId, req.body);

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(STATUS.NOT_FOUND).json({
        status: 'failed',
        message: `User with ${req.params.userId} does not exists`,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const removedUser = await UserService.delete(req.params.userId);

    if (removedUser) {
      res.send(`User with ${req.params.userId} ID is successfully removed`);
    } else {
      res.status(STATUS.NOT_FOUND).json({
        status: 'failed',
        message: `User with ${req.params.userId} does not exists`,
      });
    }
  } catch (e) {
    next(e);
  }
};
