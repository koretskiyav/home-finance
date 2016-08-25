import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const { object } = PropTypes;
const NavBar = ({user}) => (
  <ul>
    <li><Link to='/'>App</Link></li>
    {user ? <li><Link to='/home'>Home</Link></li> : null}
  </ul>
)

NavBar.propTypes = {
  user: object,
};

export default NavBar;
