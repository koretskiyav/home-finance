import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

function LoginForm(props) {
  const { fields: { email, password, confirm, auth }, handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label>
            <input
              type="radio" {...auth}
              value="login"
              checked={auth.value === 'login'}
            /> Login
          </label>
          <label>
            <input
              type="radio" {...auth}
              value="registration"
              checked={auth.value === 'registration'}
            /> Registration
          </label>
        </div>
      </div>
      <div>
        <label>Email</label>
        <input type="text" placeholder="Email" {...email} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" placeholder="Password" {...password} />
      </div>
      {auth.value === 'registration' && <div>
        <label>Confirm password</label>
        <input type="password" placeholder="confirm password" {...confirm} />
      </div>}
      <button type="submit">Submit</button>
    </form>
  );
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'login',
  fields: ['email', 'password', 'confirm', 'auth'],
  initialValues: { auth: 'login' },
})(LoginForm);
