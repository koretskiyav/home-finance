import { Schema, arrayOf, normalize } from 'normalizr';

const currencySchema = new Schema('currencies');

export const Schemas = {
  CURRENCY: currencySchema,
  CURRENCY_ARRAY: arrayOf(currencySchema),
};

export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, types, schema, ...rest } = action;

    if (!promise) {
      return next(action);
    }

    const { params } = promise;

    if (!Array.isArray(types) || types.length !== 3) {
      throw new Error('Expected an array of three action types.');
    }

    if (!types.every(type => typeof type === 'string')) {
      throw new Error('Expected action types to be strings.');
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST, params });

    return promise(client).then(
      result => next({
        ...rest,
        result: schema ? normalize(result, schema).entities : result,
        type: SUCCESS }),
      error => next({ ...rest, error, type: FAILURE })
    );
  };
}
