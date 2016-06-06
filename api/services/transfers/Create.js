import { dumpTransfer } from 'services/utils';
import Exception from 'helpers/Exception';
import Base from 'services/Base';
import mongoose from 'models';

const Budget = mongoose.model('Budget');
const Transfer = mongoose.model('Transfer');

export default class Create extends Base {
  validate(data) {
    const rules = {
      accountFrom: ['required', 'object_id'],
      accountTo: ['required', 'object_id', { not_equal_to_field: 'accountFrom' }],
      amountFrom: ['required', 'positive_decimal'],
      date: ['required', 'iso_date'],
      rate: ['required', 'positive_decimal'],
      user: ['required', 'object_id'],
    };
    return this.validator.validate({ ...data, ...this.context }, rules);
  }

  async execute(data) {
    const budget = await Budget
    .findByUser(data.user)
    .populate({ path: 'accounts' })
    .populate({ path: 'currencies', match: { prymary: true } })
    .exec();

    const accountFrom = budget.accounts.find(account => account.id === data.accountFrom);

    if (!accountFrom) {
      throw new Exception({
        code: 'NOT_FOUND',
        fields: {
          accountFrom: 'NOT_FOUND',
        },
      });
    }

    const accountTo = budget.accounts.find(account => account.id === data.accountTo);

    if (!accountTo) {
      throw new Exception({
        code: 'NOT_FOUND',
        fields: {
          accountTo: 'NOT_FOUND',
        },
      });
    }

    const prymaryCurrency = budget.currencies[0];

    const amountTo = `${prymaryCurrency.id}` === `${accountFrom.currency}` ?
      data.amountFrom / data.rate :
      data.amountFrom * data.rate;

    const transfer = new Transfer({ ...data, amountTo, budget: budget.id });
    await transfer.save();

    accountFrom.transfers.push(transfer);
    await accountFrom.save();

    accountTo.transfers.push(transfer);
    await accountTo.save();

    budget.transfers.push(transfer);
    await budget.save();

    return {
      data: dumpTransfer(transfer),
    };
  }
}
