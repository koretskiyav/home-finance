import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class NavBar extends Component {

  render() {
    return (
      <ul>
        <li><Link to='/'>App</Link></li>
        {this.props.user
          ? <li><Link to='/home'>Home</Link></li>
          : null
        }
      </ul>
    );
  }
}

NavBar.propTypes = {
  user: PropTypes.object,
};

export default NavBar;
