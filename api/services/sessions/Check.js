import jwt from 'jsonwebtoken';
import Base from 'services/Base';
import { secret } from 'etc/config.json';

export default class Check extends Base {
  validate(data) {
    const rules = {
      token: ['required'],
    };

    return this.validator.validate(data, rules);
  }

  execute({ token }) {
    return jwt.verify(token, secret);
  }
}
