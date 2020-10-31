import { NextFunction, Request, Response, Router } from 'express';
import { STATUS } from 'src/constants';
import { AuthService } from '../services';
import { errorLogger } from '../middleware';

const router = Router()
  .post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AuthService.login(req.body.userName, req.body.password);

      if (result) {
        res.json(result);
      } else {
        res.status(STATUS.INVALID).json({
          status: 'failed',
          message: `Please check user or password`,
        });
      }
    } catch (e) {
      next(e);
    }
  })
  .use(errorLogger);

export default router;
