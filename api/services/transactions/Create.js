import { dumpTransaction } from 'services/utils';
import Exception from 'helpers/Exception';
import Base from 'services/Base';
import mongoose from 'models';

const Budget = mongoose.model('Budget');
const Transaction = mongoose.model('Transaction');

export default class Create extends Base {
  validate(data) {
    const rules = {
      account: ['required', 'object_id'],
      category: ['required', 'object_id'],
      date: ['required', 'iso_date'],
      price: ['required', 'positive_decimal'],
      quantity: ['required', 'positive_decimal'],
      user: ['required', 'object_id'],
    };
    return this.validator.validate({ ...data, ...this.context }, rules);
  }

  async execute(data) {
    const budget = await Budget
      .findOne({ users: data.user })
      .populate({ path: 'accounts', match: { _id: data.account }, populate: 'transactions' })
      .populate({ path: 'categories', match: { _id: data.category }, populate: 'transactions' })
      .exec();

    const account = budget.accounts[0];

    if (!account) {
      throw new Exception({
        code: 'NOT_FOUND',
        fields: {
          account: 'NOT_FOUND',
        },
      });
    }

    const category = budget.categories[0];

    if (!category) {
      throw new Exception({
        code: 'NOT_FOUND',
        fields: {
          category: 'NOT_FOUND',
        },
      });
    }

    const transaction = new Transaction({ ...data, budget: budget.id });
    await transaction.save();

    account.transactions.push(transaction);
    await account.save();

    category.transactions.push(transaction);
    await category.save();

    budget.transactions.push(transaction);
    await budget.save();

    return {
      data: dumpTransaction(transaction),
    };
  }
}
