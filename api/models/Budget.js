import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
  accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  currencies: [{ type: Schema.Types.ObjectId, ref: 'Currency' }],
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  transfers: [{ type: Schema.Types.ObjectId, ref: 'Transfer' }],
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

BudgetSchema.statics.findByUser = function findByUser(user) {
  return this.findOne({ users: user });
};

mongoose.model('Budget', BudgetSchema);
