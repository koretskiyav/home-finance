import { dumpCategory } from 'services/utils';
import Base from 'services/Base';
import mongoose from 'models';

const Category = mongoose.model('Category');

export default class List extends Base {
  validate() {
    return;
  }

  async execute() {
    const categories = await Category.find();

    return {
      data: categories.map(dumpCategory),
    };
  }
}
