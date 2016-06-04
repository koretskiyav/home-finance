import { dumpAccount } from 'services/utils';
import Exception from 'helpers/Exception';
import Base from 'services/Base';
import mongoose from 'models';

const Account = mongoose.model('Account');
const Budget = mongoose.model('Budget');
const Currency = mongoose.model('Currency');

export default class Create extends Base {
  validate(data) {
    const rules = {
      title: 'required',
      currency: ['required', 'object_id'],
      user: ['required', 'object_id'],
    };
    return this.validator.validate({ ...data, ...this.context }, rules);
  }

  async execute({ user, title, currency }) {
    const budget = await Budget.findOne({ users: user });

    if (!await Currency.findById(currency, { budget: budget.id })) {
      throw new Exception({
        code: 'NOT_FOUND',
        fields: {
          currency: 'NOT_FOUND',
        },
      });
    }

    const account = new Account({ title, currency, budget: budget.id });
    await account.save();

    budget.accounts.push(account);
    await budget.save();

    return {
      data: dumpAccount(account),
    };
  }
}
