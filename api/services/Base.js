export default class Base {
  constructor(args) {
    if (!args.validator) throw new Error('validator required');
    if (!args.context) throw new Error('context required');

    this.validator = args.validator;
    this.context = args.context;
  }

  async run(params) {
    const data = await this.validate(params);

    return await this.execute(data);
  }
}
