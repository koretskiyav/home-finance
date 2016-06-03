import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RateSchema = new Schema({
  currency: { type: Schema.Types.ObjectId, required: true, ref: 'Currency' },
  rate: { type: Number, required: true },
  date: { type: Date, required: true },
});

mongoose.model('Rate', RateSchema);
