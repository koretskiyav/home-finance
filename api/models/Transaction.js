import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  account: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  budget: { type: Schema.Types.ObjectId, required: true, ref: 'Budget' },
  category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

TransactionSchema
  .virtual('amount')
  .get(function get() {
    return + (this.quantity * this.price).toFixed(2);
  });

mongoose.model('Transaction', TransactionSchema);
