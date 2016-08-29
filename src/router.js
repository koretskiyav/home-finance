import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
  App,
  LoginPage,
  HomePage,
} from 'containers';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="home" component={HomePage} />
  </Route>
);
