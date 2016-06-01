import Base from './Base';

export default class Categories extends Base {
  async create(req) {
    return await this.run('categories/Create', {
      session: req.session,
      params: req.body,
    });
  }

  async list(req) {
    return await this.run('categories/List', {
      session: req.session,
      params: req.query,
    });
  }
}
