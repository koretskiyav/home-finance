import Base from './Base';

export default class Transaction extends Base {
  async create(req) {
    return await this.run('transactions/Create', {
      session: req.session,
      params: req.body,
    });
  }

  async list(req) {
    return await this.run('transactions/List', {
      session: req.session,
      params: req.query,
    });
  }
}
