import { NextFunction, Request, Response, Router } from 'express';
import { STATUS } from 'src/constants';
import { GroupService } from '../services';
import { validationIdSchema, validationBodySchema, validationUserIdsSchema, errorLogger } from '../middleware';
import { idSchema, groupSchema } from '../validators';

const router = Router()
  .post(
    '/assign/',
    validationIdSchema(idSchema, 'groupId'),
    validationUserIdsSchema(idSchema),
    async (req: Request, res: Response, next: NextFunction) => {
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
    }
  )
  .get('/', async (req: Request, res: Response) => {
    const groupList = await GroupService.getList();

    res.json(groupList);
  })
  .post('/', validationBodySchema(groupSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newGroup = await GroupService.create(req.body);

      res.json(newGroup);
    } catch (e) {
      next(e);
    }
  })
  .get(
    '/:groupId',
    validationIdSchema(idSchema, 'groupId'),
    async (req: Request, res: Response, next: NextFunction) => {
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
    }
  )
  .put(
    '/:groupId',
    validationIdSchema(idSchema, 'groupId'),
    async (req: Request, res: Response, next: NextFunction) => {
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
    }
  )
  .delete(
    '/:groupId',
    validationIdSchema(idSchema, 'groupId'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const removedGroup = await GroupService.delete(req.params.groupId);

        if (removedGroup) {
          res.send(`Group with ${req.params.groupId} ID is successfully removed`);
        } else {
          res.status(STATUS.NOT_FOUND).json({
            status: 'failed',
            // @ts-ignore
            message: `Group with ${req.params.groupId.dddd.ddd} does not exists`,
          });
        }
      } catch (e) {
        next(e);
      }
    }
  )
  .use(errorLogger);

export default router;
