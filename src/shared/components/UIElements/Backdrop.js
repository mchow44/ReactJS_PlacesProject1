import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

// place this line back into html <div> tag, and insert below
// here, we can give an onClick property to the <div> tag, and that's the main purpose of our <Backdrop> component
// we can pass an onClick function to {props.onClick}
const Backdrop = props => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
