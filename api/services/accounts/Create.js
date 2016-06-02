import { dumpAccount } from 'services/utils';
import Base from 'services/Base';
import mongoose from 'models';

const Account = mongoose.model('Account');

export default class Create extends Base {
  validate(data) {
    const rules = {
      title: 'required',
      currencyId: ['required', 'object_id'],
      budgetId: ['required', 'object_id'],
    };
    return this.validator.validate({ ...data, ...this.context }, rules);
  }

  async execute(data) {
    const account = new Account(data);

    await account.save();

    return dumpAccount(account);
  }
}
