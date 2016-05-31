import Base from './Base';

export default class Budgets extends Base {
  async create(req) {
    return await this.run('users/Create', { params: req.body });
  }

  async list() {
    return await this.run('users/List', { params: {} });
  }
}
