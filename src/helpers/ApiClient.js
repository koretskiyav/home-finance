import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  return `/api${path}`;
}

export default class ApiClient {
  constructor() {
    methods.forEach((method) => {
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (this.authToken) {
          request.query({ token: this.authToken });
        }

        if (params) {
          request.query(params);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => {
          if (err || !body || !body.status) {
            return reject(body && body.error || err);
          }
          if (body.jwt) {
            this.setAuthToken(body.jwt);
          }

          return resolve(body.data);
        });
      });
    });
  }

  setAuthToken(authToken) {
    this.authToken = authToken;
  }
}
