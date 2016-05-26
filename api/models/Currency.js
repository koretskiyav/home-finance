import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const RateSchema = mongoose.model('Rate');

const CurrencySchema = new Schema({
  code: { type: String, required: true },
  rates: [RateSchema],
  createdAt: { type: Date, default: new Date() },
});

mongoose.model('Currency', CurrencySchema);
