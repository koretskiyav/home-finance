import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { register, login } from 'redux/modules/auth';

class App extends Component {
  render() {
    return (
      <h1>test</h1>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    user: state.auth.user,
    error: state.auth.error,
    loading: state.auth.loading,
  })
)(App);
