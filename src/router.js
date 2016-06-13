import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import LoginPage from 'containers/LoginPage';
import HomePage from 'containers/HomePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="home" component={HomePage} />
  </Route>
);
