import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'; 
// NavLink analyzes url and colors it - like if we need to show this is the link that is active for example

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

// we give it "exact" NavLink property because we want to mark this active link and have it styled in css
const NavLinks = props => {
  const auth = useContext(AuthContext); // auth will now contain all states
  return (
  <ul className="nav-links">
    <li>
      <NavLink to="/" exact>ALL USERS</NavLink>
    </li>
    {auth.isLoggedIn && (
      <li>
        <NavLink to="/u1/places">MY PLACES</NavLink>
      </li> 
    )}
    {auth.isLoggedIn && (
      <li>
        <NavLink to="/places/new">ADD PLACE</NavLink>
      </li>
    )}
    {!auth.isLoggedIn && (
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>  
    )}
    {auth.isLoggedIn && ( 
      <li>
        <button onClick={auth.logout}>LOGOUT</button>
      </li>
    )}
  </ul>
  );
}

export default NavLinks;