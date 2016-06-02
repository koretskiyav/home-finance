import { dumpCategory } from 'services/utils';
import Base from 'services/Base';
import mongoose from 'models';

const Category = mongoose.model('Category');

export default class List extends Base {
  validate() {
    const rules = {
      budgetId: ['required', 'object_id'],
    };
    return this.validator.validate(this.context, rules);
  }

  async execute(data) {
    const categories = await Category.find(data);

    return {
      data: categories.map(dumpCategory),
    };
  }
}
