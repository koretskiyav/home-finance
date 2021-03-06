import express from 'express';
import routes from './routes';

import getLogger from 'helpers/logger';
import PromiseRouter from 'helpers/PromiseRouter';

/* eslint new-cap: 0 */
/* eslint max-len: [0, 120] */
const router = PromiseRouter(express.Router);

const logger = getLogger('API:ROUTER');

const checkSession = routes.sessions.check.bind(routes.sessions);

router.getAsync('/users', checkSession, routes.users.list.bind(routes.users));
router.postAsync('/users', routes.users.create.bind(routes.users));

router.postAsync('/sessions', routes.sessions.create.bind(routes.sessions));

router.getAsync('/currencies', checkSession, routes.currencies.list.bind(routes.currencies));
router.postAsync('/currencies', checkSession, routes.currencies.create.bind(routes.currencies));
router.putAsync('/currencies/:id', checkSession, routes.currencies.update.bind(routes.currencies));
router.deleteAsync('/currencies/:id', checkSession, routes.currencies.remove.bind(routes.currencies));

router.getAsync('/categories', checkSession, routes.categories.list.bind(routes.categories));
router.postAsync('/categories', checkSession, routes.categories.create.bind(routes.categories));

router.getAsync('/accounts', checkSession, routes.accounts.list.bind(routes.accounts));
router.postAsync('/accounts', checkSession, routes.accounts.create.bind(routes.accounts));

router.getAsync('/transactions', checkSession, routes.transactions.list.bind(routes.transactions));
router.postAsync('/transactions', checkSession, routes.transactions.create.bind(routes.transactions));

router.getAsync('/transfers', checkSession, routes.transfers.list.bind(routes.transfers));
router.postAsync('/transfers', checkSession, routes.transfers.create.bind(routes.transfers));

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
