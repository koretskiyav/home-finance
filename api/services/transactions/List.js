import { dumpTransaction } from 'services/utils';
import Base from 'services/Base';
import mongoose from 'models';

const Transaction = mongoose.model('Transaction');

export default class List extends Base {
  validate() {
    const rules = {
      budgetId: 'required',
    };
    return this.validator.validate(this.context, rules);
  }

  async execute(data) {
    const transactions = await Transaction.find(data);

    return {
      data: transactions.map(dumpTransaction),
    };
  }
}
