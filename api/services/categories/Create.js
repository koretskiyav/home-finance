import { dumpCategory } from 'services/utils';
import Exception from 'helpers/Exception';
import Base from 'services/Base';
import mongoose from 'models';

const Category = mongoose.model('Category');

export default class Create extends Base {
  validate(data) {
    const rules = {
      title: 'required',
      parentId: 'not_empty',
      budgetId: 'required',
    };
    return this.validator.validate({ ...data, ...this.context }, rules);
  }

  async execute(data) {
    if (data.parentId && !await Category.findById(data.parentId)) {
      throw new Exception({
        code: 'NOT_FOUND',
        fields: {
          parentId: 'NOT_FOUND',
        },
      });
    }

    const category = new Category(data);

    await category.save();

    return dumpCategory(category);
  }
}
