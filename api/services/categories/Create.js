import { dumpCategory } from 'services/utils';
import Exception from 'helpers/Exception';
import Base from 'services/Base';
import mongoose from 'models';

const Category = mongoose.model('Category');
const Budget = mongoose.model('Budget');

export default class Create extends Base {
  validate(data) {
    const rules = {
      title: 'required',
      type: ['required', { one_of: ['INCOME', 'EXPENSES'] }],
      parent: ['not_empty', 'object_id'],
      user: ['required', 'object_id'],
    };
    return this.validator.validate({ ...data, ...this.context }, rules);
  }

  async execute(data) {
    const { user } = data;
    const budget = await Budget.findOne({ users: user }).populate('categories').exec();

    if (data.parent) {
      const parent = budget.categories.find(category => category.id === data.parent);

      if (!parent) {
        throw new Exception({
          code: 'NOT_FOUND',
          fields: {
            parent: 'NOT_FOUND',
          },
        });
      }

      if (parent.type !== data.type) {
        throw new Exception({
          code: 'NOT_EQUAL_TO_PARENT',
          fields: {
            type: 'NOT_EQUAL_TO_PARENT',
          },
        });
      }
    }

    const category = new Category({ ...data, budget: budget.id });
    await category.save();

    if (data.parent) {
      const parent = await Category.findById(data.parent);

      parent.children.push(category);
      await parent.save();
    }

    budget.categories.push(category);
    await budget.save();

    return {
      data: dumpCategory(category),
    };
  }
}
