import { Router } from 'express';
import userRouter from './user';
import groupRouter from './group';
import authRouter from './auth';

const router = Router().use('/login', authRouter).use('/users', userRouter).use('/groups', groupRouter);

export default router;
