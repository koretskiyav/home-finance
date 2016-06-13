import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

function CurrencyForm(props) {
  const { fields: { code }, handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Code</label>
        <input type="text" placeholder="Code" {...code} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

CurrencyForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'currencyAdd',
  fields: ['code'],
})(CurrencyForm);
