import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';

class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.dispatch(push('/home'));
    }
  }
  render() {
    return (
      <div>
        <ul>
          <li><Link to='/'>App</Link></li>
          <li><Link to='/home'>Home</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default connect(
  state => ({
    user: state.auth.user,
  })
)(App);
