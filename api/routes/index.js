import Users from './Users';
import Sessions from './Sessions';
import Currencies from './Currencies';
import Categories from './Categories';
import Accounts from './Accounts';
import Transactions from './Transactions';

export default {
  users: new Users(),
  sessions: new Sessions(),
  currencies: new Currencies(),
  categories: new Categories(),
  accounts: new Accounts(),
  transactions: new Transactions(),
};
