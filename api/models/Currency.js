import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
  code: { type: String, required: true, index: { unique: true } },
  createdAt: { type: Date, default: new Date() },
});

mongoose.model('Currency', CurrencySchema);
