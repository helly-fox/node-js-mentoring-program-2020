import { Request, Response, Router } from 'express';
import { STATUS } from 'src/constants';
import { UserService } from '../services';
import { validationBodySchema, validationIdSchema } from '../middleware';
import { userSchema, idSchema } from '../validators';

const router = Router()
  .get('/', async (req: Request, res: Response) => {
    const userList = await UserService.getList(
      req.query.loginSubstring as string,
      parseInt((req.query.limit as string) || '8', 10)
    );

    res.json(userList);
  })
  .get('/:userId', validationIdSchema(idSchema, 'userId'), async (req: Request, res: Response) => {
    const user = await UserService.getById(req.params.userId);

    if (user) {
      res.json(user);
    } else {
      res.status(STATUS.NOT_FOUND).json({
        status: 'failed',
        message: `User with ${req.params.userId} does not exists`,
      });
    }
  })
  .post('/', validationBodySchema(userSchema), async (req: Request, res: Response) => {
    const newUser = await UserService.create(req.body);

    res.json(newUser);
  })
  .put(
    '/:userId',
    validationBodySchema(userSchema),
    validationIdSchema(idSchema, 'userId'),
    async (req: Request, res: Response) => {
      const updatedUser = await UserService.update(req.params.userId, req.body);

      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(STATUS.NOT_FOUND).json({
          status: 'failed',
          message: `User with ${req.params.userId} does not exists`,
        });
      }
    }
  )
  .delete('/:userId', validationIdSchema(idSchema, 'userId'), async (req: Request, res: Response) => {
    const removedUser = await UserService.delete(req.params.userId);

    if (removedUser) {
      res.send(`User with ${req.params.userId} ID is successfully removed`);
    } else {
      res.status(STATUS.NOT_FOUND).json({
        status: 'failed',
        message: `User with ${req.params.userId} does not exists`,
      });
    }
  });

export default router;
