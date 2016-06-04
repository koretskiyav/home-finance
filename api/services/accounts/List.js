import { dumpAccount } from 'services/utils';
import Base from 'services/Base';
import mongoose from 'models';

const Budget = mongoose.model('Budget');

export default class List extends Base {
  validate() {
    const rules = {
      user: ['required', 'object_id'],
    };
    return this.validator.validate(this.context, rules);
  }

  async execute({ user }) {
    const budget = await Budget.findOne({ users: user }).populate('accounts').exec();

    return {
      data: budget.accounts.map(dumpAccount),
    };
  }
}
