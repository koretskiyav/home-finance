import Users from './Users';
import Budgets from './Budgets';
import Sessions from './Sessions';
import Currencies from './Currencies';

export default {
  users: new Users(),
  budgets: new Budgets(),
  sessions: new Sessions(),
  currencies: new Currencies(),
};
