import express, { Request, Response } from 'express';
import STATUS from 'src/constants';
import UserService from '../services';
import validationSchema from '../middleware';
import userSchema from '../validators';

const router = express
  .Router()
  .get('/list', (req: Request, res: Response) => {
    const userList = UserService.getUserList(
      req.query.loginSubstring as string,
      parseInt((req.query.limit as string) || '8', 10)
    );

    res.json(userList);
  })
  .get('/:userId', (req: Request, res: Response) => {
    const user = UserService.getUserById(req.params.userId);

    if (user) {
      res.json(user);
    } else {
      res.status(STATUS.NOT_FOUND).json({
        status: 'failed',
        message: `User with ${req.params.userId} does not exists`,
      });
    }
  })
  .post('/create', validationSchema(userSchema), (req: Request, res: Response) =>
    res.json(UserService.createUser(req.body))
  )
  .post('/:userId', validationSchema(userSchema), (req: Request, res: Response) => {
    const updatedUser = UserService.updateUser(req.params.userId, req.body);

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(STATUS.NOT_FOUND).json({
        status: 'failed',
        message: `User with ${req.params.userId} does not exists`,
      });
    }
  })
  .delete('/:userId', (req: Request, res: Response) => {
    const removedUser = UserService.deleteUser(req.params.userId);

    if (removedUser) {
      res.json(removedUser);
    } else {
      res.status(STATUS.NOT_FOUND).json({
        status: 'failed',
        message: `User with ${req.params.userId} does not exists`,
      });
    }
  });

export default router;
