import express from 'express';
import router from 'src/router';

const port = 3004;

express()
  .use(express.json())
  .use('/api', router)
  .listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening at http://localhost:${port}`);
  });
