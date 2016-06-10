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

  async update(req) {
    return await this.run('currencies/Update', {
      session: req.session,
      params: { ...req.body, currency: req.params.id },
    });
  }

  async remove(req) {
    return await this.run('currencies/Remove', {
      session: req.session,
      params: { currency: req.params.id },
    });
  }
}
