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
      currencyId: ['required', 'object_id'],
      userId: 'required',
    };
    return this.validator.validate({ ...data, ...this.context }, rules);
  }

  async execute({ currencyId, userId }) {
    if (!await Currency.findById(currencyId)) {
      throw new Exception({
        code: 'NOT_FOUND',
        fields: {
          currency: 'NOT_FOUND',
        },
      });
    }

    const user = await User.findById(userId);

    if (user.budgetId) {
      throw new Exception({
        code: 'NOT_UNIQUE',
        fields: {
          budgetId: 'NOT_UNIQUE',
        },
      });
    }

    const budget = new Budget({ currencyId });

    await budget.save();

    user.budgetId = budget.id;

    await user.save();

    return {
      data: dumpBudget(budget),
    };
  }
}
