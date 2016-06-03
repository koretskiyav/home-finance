import { dumpCurrency } from 'services/utils';
import Base from 'services/Base';
import mongoose from 'models';

const Currency = mongoose.model('Currency');

export default class List extends Base {
  validate() {
    const rules = {
      budgetId: ['required', 'object_id'],
    };
    return this.validator.validate(this.context, rules);
  }

  async execute(data) {
    const currencies = await Currency.find(data);

    return {
      data: currencies.map(dumpCurrency),
    };
  }
}
