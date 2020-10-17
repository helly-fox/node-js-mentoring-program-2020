import express from 'express';
import router from 'src/router';
import { STATUS } from 'src/constants';
import { requestLogger, trackExecutionTime } from 'src/middleware';
import db from './db';
import logger from './config/logger';

const DEFAULT_PORT = 3004;
const port = process.env.PORT || DEFAULT_PORT;

(async () => {
  await db.sequelize.sync({ force: true });
  process.on('uncaughtException', (err) => {
    logger.error(err);
    // eslint-disable-next-line no-magic-numbers
    process.exit(1);
  });
  process.on('unhandledRejection', (err) => {
    logger.error(err);
  });

  return express()
    .use(express.json())
    .use(trackExecutionTime)
    .use(requestLogger)
    .use('/api', router)
    .use('*', (req, res) =>
      res.status(STATUS.NOT_FOUND).json({
        success: 'Failed',
        message: 'Route not Found',
      })
    )
    .listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`App listening at http://localhost:${port}`);
    });
})();
