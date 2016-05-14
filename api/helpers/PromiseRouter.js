import methods from 'methods';
import promiseWrapper from './promiseWrapper';

export default function PromiseRouter(Router) {
    /* eslint new-cap:0 */
  const router = Router();

  methods.forEach((method) => {
    router[`${method}Async`] = (path, ...rest) =>
      router[method](path, ...rest.map(promiseWrapper));
  });

  return router;
}
