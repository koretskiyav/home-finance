import Base from './Base';

export default class Transfers extends Base {
  async create(req) {
    return await this.run('transfers/Create', {
      session: req.session,
      params: req.body,
    });
  }

  async list(req) {
    return await this.run('transfers/List', {
      session: req.session,
      params: req.query,
    });
  }
}
