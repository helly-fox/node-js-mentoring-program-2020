import { Router } from 'express';
import { errorLogger, validationBodySchema, validationIdSchema, checkAuth } from '../middleware';
import { userSchema, idSchema } from '../validators';
import { getUserList, getUserById, createUser, updateUser, deleteUser } from '../controllers/user';

const router = Router()
  .get('/', getUserList)
  .get('/:userId', checkAuth, validationIdSchema(idSchema, 'userId'), getUserById)
  .post('/', validationBodySchema(userSchema), createUser)
  .put('/:userId', checkAuth, validationBodySchema(userSchema), validationIdSchema(idSchema, 'userId'), updateUser)
  .delete('/:userId', checkAuth, validationIdSchema(idSchema, 'userId'), deleteUser)
  .use(errorLogger);

export default router;
