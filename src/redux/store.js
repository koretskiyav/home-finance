import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { createHistory } from 'history';

import router from 'router';
import ApiClient from 'helpers/ApiClient';
import reducers from './reducers';
import clientMiddleware from './middleware/clientMiddleware';

const client = new ApiClient();

const store = compose(
  reduxReactRouter({ router, createHistory }),
  applyMiddleware(clientMiddleware(client))
)(createStore)(reducers);

export default store;
