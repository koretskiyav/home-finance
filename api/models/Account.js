import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  sign: { type: String, enum: ['PLUS', 'MINUS'], required: true },
  title: { type: String, required: true },
  currencyId: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: new Date() },
});

mongoose.model('Account', AccountSchema);
