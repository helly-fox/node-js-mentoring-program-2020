import { Router } from 'express';
import {
  validationIdSchema,
  validationBodySchema,
  validationUserIdsSchema,
  errorLogger,
  checkAuth,
} from '../middleware';
import { idSchema, groupSchema } from '../validators';
import { assignGroup, createGroup, updateGroup, deleteGroup, getGroupById, getGroupList } from '../controllers/group';

const router = Router()
  .post('/assign/', checkAuth, validationIdSchema(idSchema, 'groupId'), validationUserIdsSchema(idSchema), assignGroup)
  .get('/', checkAuth, getGroupList)
  .post('/', validationBodySchema(groupSchema), createGroup)
  .get('/:groupId', checkAuth, validationIdSchema(idSchema, 'groupId'), getGroupById)
  .put('/:groupId', checkAuth, validationIdSchema(idSchema, 'groupId'), updateGroup)
  .delete('/:groupId', checkAuth, validationIdSchema(idSchema, 'groupId'), deleteGroup)
  .use(errorLogger);

export default router;
