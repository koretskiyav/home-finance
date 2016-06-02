import LIVR from 'livr';
import Exception from 'helpers/Exception';

const defaultRules = {
  'object_id'() {
    return value => {
      if (value === undefined || value === null || value === '') return undefined;
      if (typeof value !== 'string') return 'FORMAT_ERROR';
      if (value.length < 24) return 'WRONG_ID';
      if (value.length > 24) return 'WRONG_ID';
      if (value.match(/[^a-f0-9]/)) return 'WRONG_ID';
      return undefined;
    };
  },
};

LIVR.Validator.registerDefaultRules(defaultRules);

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
