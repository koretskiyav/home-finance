import LIVR from 'livr';
import Exception from 'helpers/Exception';

export default class Validator {
  validate(data, rules) {
    const validator = new LIVR.Validator(rules).prepare();
    const result = validator.validate(data);

    if (!result) {
      throw new Exception({
        code: 'FORMAT_ERROR',
        fields: validator.getErrors(),
      });
    }
    return result;
  }
}
