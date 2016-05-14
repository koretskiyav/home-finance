import express from 'express';
import routes from './routes';

import getLogger from 'helpers/logger';
import PromiseRouter from 'helpers/PromiseRouter';

/* eslint new-cap:0 */
const router = PromiseRouter(express.Router);

const logger = getLogger('API:ROUTER');

router.getAsync('/test', routes.test.get);
router.postAsync('/test', routes.test.post);

router.use((req, res) => {
  logger.error(`${req.method} ${req.url}`);
  logger.error('BODY: ', req.body);
  logger.error('-------------------');

  res.send({
    status: 0,
    error: {
      code: 'UNKNOWN_API_ENDPOINT',
      message: 'Please, contact your system administartor!',
    },
  });
});

export default router;
