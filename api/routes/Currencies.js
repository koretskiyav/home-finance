import Base from './Base';

export default class Currencies extends Base {
  async create(req) {
    return await this.run('currencies/Create', {
      session: req.session,
      params: req.body,
    });
  }

  async list(req) {
    return await this.run('currencies/List', {
      session: req.session,
      params: req.query,
    });
  }
}
