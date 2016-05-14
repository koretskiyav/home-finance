import getLogger from 'helpers/logger';

const logger = getLogger('API:ROUTER');

export default {
  test: {
    get: (req) => {
      logger.info(req.url, 'get test');
      return { data: 'get test' };
    },
    post: (req) => {
      logger.info(req.url, 'post test');
      return { data: 'post test' };
    },
  },
};
