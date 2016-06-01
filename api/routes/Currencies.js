import Base from './Base';

export default class Currencies extends Base {
  async create(req) {
    return await this.run('currencies/Create', {
      params: req.body,
    });
  }

  async list(req) {
    return await this.run('currencies/List', {
      params: req.query,
    });
  }
}
