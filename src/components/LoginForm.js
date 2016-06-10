import React, { Component, PropTypes } from 'react';

class LoginForm extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    this.props.onSubmit({ email, password });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="email" placeholder="email" />
        <input type="password" ref="password" placeholder="password" />
        <button onClick={this.handleSubmit}>login</button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
