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
    };
    return this.validator.validate(data, rules);
  }

  async execute(data) {
    if (!this.context.userBudgetId) {
      throw new Exception({
        code: 'NO_BUDGET',
        fields: {
          budgetId: 'REQUIRED',
        },
      });
    }

    if (data.parentId && !await Category.findById(data.parentId)) {
      throw new Exception({
        code: 'NOT_FOUND',
        fields: {
          parentId: 'NOT_FOUND',
        },
      });
    }

    const category = new Category({ ...data, budgetId: this.context.userBudgetId });

    await category.save();

    return dumpCategory(category);
  }
}
