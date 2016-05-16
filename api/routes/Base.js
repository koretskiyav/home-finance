import services from 'services';
import getLogger from 'helpers/logger';

const logger = getLogger('API:routes');

export default class Base {
  log(type, actionName, params, startTime, error) {
    /* eslint max-len:0 */
    logger[type](`=> ${actionName} | ${Date.now() - startTime} ms | params: ${JSON.stringify(params)} ${error ? ` | ${JSON.stringify(error)}` : ''}`);
  }

  async run(actionName, { params = {} }) {
    const [actionGroup, actionClass] = actionName.split('/');
    const startTime = Date.now();

    try {
      const result = await new services[actionGroup][actionClass]({
        validator: this.validator,
      }).run(params);

      this.log('debug', actionName, params, startTime);
      return result;
    } catch (error) {
      this.log('warn', actionName, params, startTime, error);
      throw error;
    }
  }
}
