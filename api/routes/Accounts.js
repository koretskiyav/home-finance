import Base from './Base';

export default class Accounts extends Base {
  async create(req) {
    return await this.run('accounts/Create', {
      session: req.session,
      params: req.body,
    });
  }

  async list(req) {
    return await this.run('accounts/List', {
      session: req.session,
      params: req.query,
    });
  }
}
