import { dumpCurrency } from 'services/utils';
import Exception from 'helpers/Exception';
import Base from 'services/Base';
import mongoose from 'models';

const Currency = mongoose.model('Currency');

export default class Create extends Base {
  validate(data) {
    const rules = {
      code: ['required', { length_equal: 3 }, 'to_uc'],
      budgetId: ['required', 'object_id'],
    };
    return this.validator.validate({ ...data, ...this.context }, rules);
  }

  async execute(data) {
    if (await Currency.findOne(data)) {
      throw new Exception({
        code: 'NOT_UNIQUE',
        fields: {
          code: 'NOT_UNIQUE',
        },
      });
    }

    const currency = new Currency(data);
    await currency.save();

    return {
      data: dumpCurrency(currency),
    };
  }
}
