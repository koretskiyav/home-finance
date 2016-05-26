import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RateSchema = new Schema({
  rate: { type: Number, required: true },
  date: { type: Date, default: new Date() },
});

mongoose.model('Rate', RateSchema);
