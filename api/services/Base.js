import Validator from './Validator';

export default class Base {
  constructor() {
    this.validator = new Validator();
  }

  async run(params) {
    const data = await this.validate(params);

    return await this.execute(data);
  }
}
