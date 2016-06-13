import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import LoginForm from 'components/LoginForm';
import { login, register } from 'redux/modules/auth';

class LoginPage extends Component {
  handleSubmit = ({ email, password, confirm, auth }) => {
    if (auth === 'registration') {
      this.props.dispatch(register({ email, password, confirm }));
    } else {
      this.props.dispatch(login({ email, password }));
    }
  }

  render() {
    return (
      <div>
        <LoginForm
          onSubmit={this.handleSubmit}
          error={this.props.error}
        />
      {this.props.error && this.props.error.code}
      {this.props.loading && 'loading...'}
      </div>
    );
  }
}

LoginPage.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    error: state.auth.error,
    loading: state.auth.loading,
  })
)(LoginPage);
