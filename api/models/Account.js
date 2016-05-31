import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  title: { type: String, required: true },
  currencyId: { type: Schema.Types.ObjectId, required: true },
  budgetId: { type: Schema.Types.ObjectId, required: true },
});

mongoose.model('Account', AccountSchema);
