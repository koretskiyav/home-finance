import { dumpBudget } from 'services/utils';
import Exception from 'helpers/Exception';
import Base from 'services/Base';
import mongoose from 'models';

const Budget = mongoose.model('Budget');
const User = mongoose.model('User');

export default class Create extends Base {
  validate() {
    const rules = {
      userId: 'required',
    };
    return this.validator.validate(this.context, rules);
  }

  async execute({ userId }) {
    const user = await User.findById(userId);

    if (user.budgetId) {
      throw new Exception({
        code: 'NOT_UNIQUE',
        fields: {
          budgetId: 'NOT_UNIQUE',
        },
      });
    }

    const budget = new Budget();

    await budget.save();

    user.budgetId = budget.id;

    await user.save();

    return {
      data: dumpBudget(budget),
    };
  }
}
