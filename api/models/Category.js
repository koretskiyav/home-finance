import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: { type: String, required: true },
  parentId: { type: Schema.Types.ObjectId },
  budgetId: { type: Schema.Types.ObjectId, required: true },
});

mongoose.model('Category', CategorySchema);