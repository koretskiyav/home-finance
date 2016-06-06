import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

import getRoutes from 'router';
import store from 'redux/store';

render(
  <Provider store={store}>
    <ReduxRouter routes={getRoutes(store)} />
  </Provider>
, document.getElementById('app'));
