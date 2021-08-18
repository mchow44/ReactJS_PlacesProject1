// Summary: Here at this file, I want to add animation and display functions to SideDrawer of mobile/tabliet view
//          <SideDrawer> will encase our <NavLinks> at MainNavigation.js
//          {props.children} will signify the hamburger
//          <aside>'s are frequently presented as sidebars or call-out boxes.
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group'; // gives SideDrawer some animation

import './SideDrawer.css';

const SideDrawer = props => {
// content variable created with <CSSTransition><aside>{props.children}</aside></CSSTransition>, so we can createPortal and stick this somewhere else in html dom tree
// we use <CSSTransition> to wrap around <aside>
// the "in" prop for <CSSTransition> binds {props.show} - boolean from App.js, if true - show, if false - remove (invisible)
//    - <CSSTransition in={props.show}> will have props.show as a passed in function, from <SideDrawer show={drawerIsOpen}> and that function returns true/false
//    - {props.show} property is handled within MainNavigation.js file, at the <SideDrawer show={drawerIsOpen = true/false}> logic 
//    - SUMMARY: if in is true, then SideDrawer is visible, if in is false, then SideDrawer is not visible
// with className="slide-in-left" as a property to <CSSTransition>, we can animate how slow it slides in to the left, 
//    - "slide-in-left" class selector is within index.css
// inside the <aside> tag, we gave it an onClick function
//    - this onClick function: <SideDrawer onClick={drawerIsOpen}> , will set drawerIsOpen to false, 
//    - which a drawerIsOpen=false, at MainNavigation.js will tell the && logic to close the box whenever we click on any position or link within that <SideDrawer> box
// mountOnEnter and unmountOnExit tells the DOM when the <aside> component can be added
  const content = (
    <CSSTransition 
      in={props.show} 
      timeout={200} 
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
  // this returns the content constant back to the main HTML page
};


export default SideDrawer;