import { dumpBudget } from 'services/utils';
import Exception from 'helpers/Exception';
import Base from 'services/Base';
import mongoose from 'models';

const Budget = mongoose.model('Budget');
const User = mongoose.model('User');
const Currency = mongoose.model('Currency');

export default class Create extends Base {
  validate(data) {
    const rules = {
      currencyId: 'required',
    };
    return this.validator.validate(data, rules);
  }

  async execute({ currencyId }) {
    if (!await Currency.findById(currencyId)) {
      throw new Exception({
        code: 'NOT_FOUND',
        fields: {
          currency: 'NOT_FOUND',
        },
      });
    }

    if (!this.context.userId) {
      throw new Exception({
        code: 'FORMAT_ERROR',
        fields: {
          userId: 'REQUIRED',
        },
      });
    }

    if (this.context.userBudgetId) {
      throw new Exception({
        code: 'NOT_UNIQUE',
        fields: {
          budgetId: 'NOT_UNIQUE',
        },
      });
    }

    const user = await User.findById(this.context.userId);
    const budget = new Budget({ currencyId });

    await budget.save();

    user.budgetId = budget.id;

    await user.save();

    return dumpBudget(budget);
  }
}
