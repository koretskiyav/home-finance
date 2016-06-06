import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TransferSchema = new Schema({
  accountFrom: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  accountTo: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  amountFrom: { type: Number, required: true },
  amountTo: { type: Number, required: true },
  budget: { type: Schema.Types.ObjectId, required: true, ref: 'Budget' },
  date: { type: Date, required: true },
  rate: { type: Number, required: true },
});

mongoose.model('Transfer', TransferSchema);
