import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
  currencyId: { type: Schema.Types.ObjectId, required: true },
});

mongoose.model('Budget', BudgetSchema);
