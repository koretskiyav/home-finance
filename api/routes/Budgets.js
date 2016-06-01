import Base from './Base';

export default class Budgets extends Base {
  async create(req) {
    return await this.run('budgets/Create', {
      session: req.session,
      params: req.body,
    });
  }
}
