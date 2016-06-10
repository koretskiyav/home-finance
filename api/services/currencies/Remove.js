import Exception from 'helpers/Exception';
import Base from 'services/Base';
import mongoose from 'models';

const Currency = mongoose.model('Currency');
const Budget = mongoose.model('Budget');

export default class Remove extends Base {
  validate(data) {
    const rules = {
      user: ['required', 'object_id'],
      currency: ['required', 'object_id'],
    };
    return this.validator.validate({ ...data, ...this.context }, rules);
  }

  async execute(data) {
    const budget = await Budget.findOne({ users: data.user });

    const currency = await Currency.findOne({ _id: data.currency, budget: budget.id });

    if (!currency) {
      throw new Exception({
        code: 'NOT_FOUND',
        fields: {
          currency: 'NOT_FOUND',
        },
      });
    }

    await currency.remove();

    return {
      data: currency.id,
    };
  }
}
