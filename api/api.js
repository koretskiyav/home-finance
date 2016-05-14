import express from 'express';
import bodyParser from 'body-parser';

import getLogger from 'helpers/logger';
import router from 'router';
import { apiPort } from 'etc/config.json';

const logger = getLogger('API');

const app = express();

app.use(bodyParser.json());

app.use(router);

if (apiPort) {
  app.listen(apiPort, (err) => {
    if (err) {
      logger.error(err);
    }
    logger.info('==>     running on port %s', apiPort);
  });
} else {
  logger.error('==>     ERROR: No PORT environment variable has been specified');
}
