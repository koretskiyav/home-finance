import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.dispatch(push('/home'));
    }
  }
  render() {
    return this.props.children;
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
