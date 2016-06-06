import Express from 'express';
import httpProxy from 'http-proxy';
import getLogger from './api/helpers/logger';
import { port, apiHost, apiPort } from './api/etc/config.json';

const logger = getLogger('MAIN');

const app = new Express();

const apiUrl = `http://${apiHost}:${apiPort}`;

const proxy = httpProxy.createProxyServer({ target: apiUrl });

app.use(Express.static('./public'));

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: apiUrl });
});

if (port) {
  app.listen(port, (err) => {
    if (err) {
      logger.error(err);
    }
    logger.info('==>     running on port %s', port);
  });
} else {
  logger.error('==>     ERROR: No PORT environment variable has been specified');
}
