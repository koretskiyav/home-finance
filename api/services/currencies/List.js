import { dumpCurrency } from 'services/utils';
import Base from 'services/Base';
import mongoose from 'models';

const Currency = mongoose.model('Currency');

export default class List extends Base {
  validate() {
    return;
  }

  async execute() {
    const currencies = await Currency.find();

    return {
      data: currencies.map(dumpCurrency),
    };
  }
}
