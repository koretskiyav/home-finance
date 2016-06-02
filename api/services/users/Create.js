import { dumpUser } from 'services/utils';
import Exception from 'helpers/Exception';
import Base from 'services/Base';
import mongoose from 'models';

const User = mongoose.model('User');

export default class Create extends Base {
  validate(data) {
    const rules = {
      email: ['required', 'email'],
      password: 'required',
      confirm: ['required', { equal_to_field: 'password' }],
    };
    return this.validator.validate(data, rules);
  }

  async execute({ email, password }) {
    if (await User.findOne({ email })) {
      throw new Exception({
        code: 'NOT_UNIQUE',
        fields: {
          email: 'NOT_UNIQUE',
        },
      });
    }

    const user = new User({ email, password });
    await user.save();

    return {
      data: dumpUser(user),
    };
  }
}
