import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from './modules/auth';
import currencies from './modules/currencies';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  auth,
  currencies,
});
