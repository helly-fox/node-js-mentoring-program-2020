import express from 'express';
import router from 'src/router';
import STATUS from 'src/constants';

const DEFAULT_PORT = 3004;
const port = process.env.PORT || DEFAULT_PORT;

express()
  .use(express.json())
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
