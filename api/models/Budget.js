import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
  accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  currencies: [{ type: Schema.Types.ObjectId, ref: 'Currency' }],
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

mongoose.model('Budget', BudgetSchema);
