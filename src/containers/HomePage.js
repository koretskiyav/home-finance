import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class HomePage extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        Hello, {user.email} !
      </div>
    );
  }
}

HomePage.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    user: state.auth.user,
  })
)(HomePage);
