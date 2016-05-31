import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RateSchema = new Schema({
  currencyId: { type: Schema.Types.ObjectId, required: true },
  rate: { type: Number, required: true },
  date: { type: Date, required: true },
});

mongoose.model('Rate', RateSchema);
