// SUMMARY: this Button component will have so many props to use, some passed to <a> anchor tag, <Link/> components tab
//    if <Button /> has an href props, then place an <a> anchor tag along with class styling
//    if <Button /> has a "to" props, then return a <Link /> tag for redirecting directories
//    Default: if not {props.href} or {props.to} the final return, we just return <button>, which wraps to whatever is in {props.children}
import React from 'react';
import { Link } from 'react-router-dom'; //use this for directory linking
// <Link to="/"></Link>, which will tell where the directory of that button should go to 

import './Button.css';


const Button = props => {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || 'default'} ${props.inverse &&
          'button--inverse'} ${props.danger && 'button--danger'}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }

  // if there's something existing in <Button to="...">, then it will be passed into <Link> component
  // we will use that <Link> as a <Button> feature to link the url to those created button's
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`button button--${props.size || 'default'} ${props.inverse &&
          'button--inverse'} ${props.danger && 'button--danger'}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${props.size || 'default'} ${props.inverse &&
        'button--inverse'} ${props.danger && 'button--danger'}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
