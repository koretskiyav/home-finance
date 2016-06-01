import { dumpCurrency } from 'services/utils';
import Exception from 'helpers/Exception';
import Base from 'services/Base';
import mongoose from 'models';

const Currency = mongoose.model('Currency');

export default class Create extends Base {
  validate(data) {
    const rules = {
      code: ['required', { length_equal: 3 }, 'to_uc'],
    };
    return this.validator.validate(data, rules);
  }

  async execute({ code }) {
    if (await Currency.findOne({ code })) {
      throw new Exception({
        code: 'NOT_UNIQUE',
        fields: {
          code: 'NOT_UNIQUE',
        },
      });
    }

    const currency = new Currency({ code });
    await currency.save();

    return dumpCurrency(currency);
  }
}
