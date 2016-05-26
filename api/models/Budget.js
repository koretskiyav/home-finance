import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = mongoose.model('User');
const CurrencySchema = mongoose.model('Currency');
const AccountSchema = mongoose.model('Account');


const BudgetSchema = new Schema({
  users: [UserSchema],
  accounts: [AccountSchema],
  currencies: [CurrencySchema],
});

mongoose.model('Budget', BudgetSchema);
