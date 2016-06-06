import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  budget: { type: Schema.Types.ObjectId, required: true, ref: 'Budget' },
  currency: { type: Schema.Types.ObjectId, required: true, ref: 'Currency' },
  title: { type: String, required: true },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  transfers: [{ type: Schema.Types.ObjectId, ref: 'Transfer' }],
});

mongoose.model('Account', AccountSchema);
