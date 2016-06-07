import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducers from 'redux/reducers';

export function configureStore(history, initialState) {
  return createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history)
      )
    )
  );
}
