import { dumpCurrency } from 'services/utils';
import Exception from 'helpers/Exception';
import Base from 'services/Base';
import mongoose from 'models';

const Currency = mongoose.model('Currency');
const Budget = mongoose.model('Budget');

export default class Create extends Base {
  validate(data) {
    const rules = {
      code: ['required', { length_equal: 3 }, 'to_uc'],
      user: ['required', 'object_id'],
      prymary: ['required'], // TODO add bool here
    };
    return this.validator.validate({ ...data, ...this.context }, rules);
  }

  async execute({ user, code, prymary }) {
    const budget = await Budget.findOne({ users: user });

    if (await Currency.findOne({ code, budget: budget.id })) {
      throw new Exception({
        code: 'NOT_UNIQUE',
        fields: {
          code: 'NOT_UNIQUE',
        },
      });
    }

    const currency = new Currency({ code, prymary, budget: budget.id });
    // TODO add prymary validation
    await currency.save();

    budget.currencies.push(currency);
    await budget.save();

    return {
      data: dumpCurrency(currency),
    };
  }
}
