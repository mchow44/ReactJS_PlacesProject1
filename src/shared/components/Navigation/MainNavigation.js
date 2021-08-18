// SUMMARY: This component is the pink navbar on top with all navigation links, and can size down to mobile screen-size view
//          in the mobile version, the left <SideDrawer> will pop out and display navbar links to our website url user options
//          Here, we can also display on the full laptop version, and show the nav bar links on the top right
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // we use this to define below the url root route '/' to the "YourPlaces" title at pink navbar 

import MainHeader from './MainHeader';
import NavLinks from './NavLinks'; // this will define all url routes at the navbar defined clickable buttons
import SideDrawer from './SideDrawer';
import BackDrop from '../UIElements/Backdrop'; // Backdrop greys out the background w/ z-index to stack in the middle with transparent black/grey overlay
import './MainNavigation.css';

// <Link> back to "/" directory whenever we click on title of the app
// <MainHeader> we defined to have <header> to sandwich the other HTML tags </header>
// <MainHeader> uses {props.children} to sandwich all HTML tags within here
// <NavLinks> will hold all navigation links on drawer
// <React.Fragment> allows us to return <SideDrawer> - which holds <aside> drawer tags
// , and <React.Fragment> allows us to return <MainHeader> together
// <span /> will be shaped as the 3 lines, wrapped by a <button> tag
function MainNavigation(props) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false); // rendered drawer to false, not open
  // BUT! once drawerIsOpen is set to true, we will run the {drawerIsOpen && ...} logic call to display <SideDrawer>
  // while <SideDrawer> for display, we also have <NavLinks> displayed on column view, and <BackDrop> grey display with z-index: 5

  // pass this function at the onClick event at <button> below
  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  // this function is called at the BackDrop, 
  // the function is called at the <div> tag from <BackDrop>, signifying the background behind the <SideDrawer> <aside>
  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  }

  // vanilla Javascript: if drawerIsOpen is true (left side of &&), we can then run the right statement of &&, which is <BackDrop /> as this component has an event listener for onClick={closeDrawerHandler}
  // <SideDrawer> returns <aside> that is the pop-out left-drawer, and it has transition animations from <CSSTransition> within
  // once drawerIsOpen is true, then the <BackDrop> component is active, and we can click on the <div> container using onClick={closeDrawerHandler}
  // <MainHeader> wraps the code w/ <header>{props.children}</header>, and it is the pink back encasing the 3 hamburger lines (mobile view), YourPlaces homepage link, and NavLinks (laptop view)
  //    - the closing tag: </MainHeader> details the bottom of {props.children} from the MainHeader.js file
  //    - MainHeader.css will style the <header>
  //    - in MainHeader.css, .main-header is the css class design for the pink nav bar 
  // we add <Link to='/'> to the '/' route because the main title 'YourPlaces' will take us back to homepage displaying <Users />
  // <React.Fragment> is used beacuse <SideDrawer> also calls to root '/' route, as well as <MainHeader> navbar links
  return (
    <React.Fragment>
      {drawerIsOpen && <BackDrop onClick={closeDrawerHandler}/>}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">
            YourPlaces
          </Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
}

export default MainNavigation;