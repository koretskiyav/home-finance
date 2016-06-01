import { dumpAccount } from 'services/utils';
import Base from 'services/Base';
import mongoose from 'models';

const Account = mongoose.model('Account');

export default class List extends Base {
  validate() {
    const rules = {
      budgetId: 'required',
    };
    return this.validator.validate(this.context, rules);
  }

  async execute(data) {
    const accounts = await Account.find(data);

    return {
      data: accounts.map(dumpAccount),
    };
  }
}
