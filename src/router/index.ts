import { Router } from 'express';
import userRouter from './user';
import groupRouter from './group';

const router = Router().use('/users', userRouter).use('/groups', groupRouter);

export default router;
