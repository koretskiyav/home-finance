import { dumpCategory } from 'services/utils';
import Exception from 'helpers/Exception';
import Base from 'services/Base';
import mongoose from 'models';

const Category = mongoose.model('Category');

export default class Create extends Base {
  validate(data) {
    const rules = {
      title: 'required',
      type: ['required', { one_of: ['INCOME', 'EXPENSES'] }],
      parentId: ['not_empty', 'object_id'],
      budgetId: ['required', 'object_id'],
    };
    return this.validator.validate({ ...data, ...this.context }, rules);
  }

  async execute(data) {
    if (data.parentId) {
      const parentCategory = await Category.findById(data.parentId);

      if (!parentCategory) {
        throw new Exception({
          code: 'NOT_FOUND',
          fields: {
            parentId: 'NOT_FOUND',
          },
        });
      }

      if (parentCategory.type !== data.type) {
        throw new Exception({
          code: 'NOT_EQUAL_TO_PARENT',
          fields: {
            type: 'NOT_EQUAL_TO_PARENT',
          },
        });
      }
    }

    const category = new Category(data);

    await category.save();

    return {
      data: dumpCategory(category),
    };
  }
}
