import { dumpUser } from 'services/utils';
import Base from 'services/Base';
import mongoose from 'models';

const User = mongoose.model('User');

export default class List extends Base {
  validate() {
    return;
  }

  async execute() {
    const users = await User.find();

    return {
      data: users.map(dumpUser),
    };
  }
}
