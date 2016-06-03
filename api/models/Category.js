import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  budget: { type: Schema.Types.ObjectId, required: true, ref: 'Budget' },
  children: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  parent: { type: Schema.Types.ObjectId, ref: 'Category' },
  title: { type: String, required: true },
  type: { type: String, enum: ['INCOME', 'EXPENSES'], required: true },
});

mongoose.model('Category', CategorySchema);
