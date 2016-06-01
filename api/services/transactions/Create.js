import { dumpTransaction } from 'services/utils';
import Exception from 'helpers/Exception';
import Base from 'services/Base';
import mongoose from 'models';

const Transaction = mongoose.model('Transaction');
const Category = mongoose.model('Category');
const Account = mongoose.model('Account');

export default class Create extends Base {
  validate(data) {
    const rules = {
      accountId: 'required',
      categoryId: 'required',
      budgetId: 'required',
      quantity: ['required', 'positive_decimal'],
      price: ['required', 'positive_decimal'],
    };
    return this.validator.validate({ ...data, ...this.context }, rules);
  }

  async execute(data) {
    if (!await Category.findById(data.categoryId)) {
      throw new Exception({
        code: 'NOT_FOUND',
        fields: {
          categoryId: 'NOT_FOUND',
        },
      });
    }

    if (!await Account.findById(data.accountId)) {
      throw new Exception({
        code: 'NOT_FOUND',
        fields: {
          categoryId: 'NOT_FOUND',
        },
      });
    }

    const transaction = new Transaction(data);

    await transaction.save();

    return dumpTransaction(transaction);
  }
}
