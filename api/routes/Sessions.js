import Base from './Base';

export default class Sessions extends Base {
  create(req) {
    return this.run('sessions/Create', {
      params: req.body,
    });
  }

  async check(req, res, next) {
    const userData = await this.run('sessions/Check', {
      params: {
        token: req.query.token,
      },
    });
    /* eslint no-param-reassign: ["error", { "props": false }] */
    req.session = {
      context: {
        user: userData.id,
      },
    };

    return next();
  }
}
