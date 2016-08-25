import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class NavBar extends Component {

  render() {
    return (
      <ul>
        <li><Link to='/'>App</Link></li>
        <li><Link to='/home'>Home</Link></li>
      </ul>
    );
  }
}

export default NavBar;
