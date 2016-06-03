import { dumpUser } from 'services/utils';
import Exception from 'helpers/Exception';
import Base from 'services/Base';
import mongoose from 'models';

const User = mongoose.model('User');
const Budget = mongoose.model('Budget');

export default class Create extends Base {
  validate(data) {
    const rules = {
      email: ['required', 'email'],
      password: 'required',
      budget: ['not_empty', 'object_id'], // TODO add something like an invait
      confirm: ['required', { equal_to_field: 'password' }],
    };
    return this.validator.validate(data, rules);
  }

  async execute(data) {
    const { email } = data;
    if (await User.findOne({ email })) {
      throw new Exception({
        code: 'NOT_UNIQUE',
        fields: {
          email: 'NOT_UNIQUE',
        },
      });
    }

    let budget;

    if (data.budget) {
      budget = await Budget.findById(data.budget);
      if (!budget) {
        throw new Exception({
          code: 'NOT_FOUND',
          fields: {
            budget: 'NOT_FOUND',
          },
        });
      }
    } else {
      budget = new Budget();
      await budget.save();
      /* eslint no-param-reassign: ["error", { "props": false }] */
      data.budget = budget.id;
    }

    const user = new User(data);
    await user.save();

    budget.users.push(user);
    await budget.save();

    return {
      data: dumpUser(user),
    };
  }
}
