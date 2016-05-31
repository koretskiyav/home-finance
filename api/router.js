import express from 'express';
import routes from './routes';

import getLogger from 'helpers/logger';
import PromiseRouter from 'helpers/PromiseRouter';

/* eslint new-cap:0 */
const router = PromiseRouter(express.Router);

const logger = getLogger('API:ROUTER');

router.getAsync('/users', routes.users.list.bind(routes.users));
router.postAsync('/users', routes.users.create.bind(routes.users));

router.postAsync('/budgets', routes.budgets.create.bind(routes.budgets));

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
