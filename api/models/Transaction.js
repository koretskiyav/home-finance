import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  parentId: { type: Schema.Types.ObjectId, required: true },
  budgetId: { type: Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

TransactionSchema
  .virtual('amount')
  .get(() => this.quantity * this.price);

mongoose.model('Transaction', TransactionSchema);
