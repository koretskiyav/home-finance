import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
  accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
  budget: { type: Schema.Types.ObjectId, required: true, ref: 'Budget' },
  code: { type: String },
  prymary: { type: Boolean, required: true }, // TODO add hook presave here!
  rates: [{ type: Schema.Types.ObjectId, required: true, ref: 'Rate' }],
});

mongoose.model('Currency', CurrencySchema);
