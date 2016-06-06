export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, types, onSuccess, ...rest } = action;

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
      result => {
        next({ ...rest, result, type: SUCCESS });
        if (onSuccess) {
          dispatch(onSuccess());
        }
      },
      error => next({ ...rest, error, type: FAILURE })
    );
  };
}
