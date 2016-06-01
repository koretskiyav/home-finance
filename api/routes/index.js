import Users from './Users';
import Budgets from './Budgets';
import Sessions from './Sessions';
import Currencies from './Currencies';
import Categories from './Categories';

export default {
  users: new Users(),
  budgets: new Budgets(),
  sessions: new Sessions(),
  currencies: new Currencies(),
  categories: new Categories(),
};
