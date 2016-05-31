import jwt from 'jsonwebtoken';
import Exception from 'helpers/Exception';
import { dumpUser } from 'services/utils';
import Base from 'services/Base';
import { secret } from 'etc/config.json';
import mongoose from 'models';

const User = mongoose.model('User');

export default class Create extends Base {
  validate(data) {
    const rules = {
      password: ['required'],
      email: ['required', 'email'],
    };

    return this.validator.validate(data, rules);
  }

  async execute({ password, email }) {
    const existingUser = await User.findOne({ email });

    if (!existingUser || !existingUser.checkPassword(password)) {
      throw new Exception({
        code: 'AUTHENTICATION_FAILED',
        fields: {
          email: 'INVALID',
          password: 'INVALID',
        },
      });
    }

    if (existingUser.status === 'BLOCKED') {
      throw new Exception({
        code: 'NOT_ACTIVE_USER',
        fields: {
          status: 'NOT_ACTIVE_USER',
        },
      });
    }

    return {
      jwt: jwt.sign(dumpUser(existingUser), secret),
    };
  }
}
