import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducers from 'redux/reducers';
import clientMiddleware from 'redux/middleware/clientMiddleware';

export function configureStore(client, history, initialState) {
  return createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(
        clientMiddleware(client),
        routerMiddleware(history)
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
