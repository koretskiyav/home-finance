import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  accountId: { type: Schema.Types.ObjectId, required: true },
  categoryId: { type: Schema.Types.ObjectId, required: true },
  budgetId: { type: Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

TransactionSchema
  .virtual('amount')
  .get(function get() {
    return + (this.quantity * this.price).toFixed(2);
  });

mongoose.model('Transaction', TransactionSchema);
