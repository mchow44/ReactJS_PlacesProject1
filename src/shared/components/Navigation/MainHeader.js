import React from 'react';

import './MainHeader.css';

// basically used for defining the <header> HTML tags
// we use <MainHeader> at MainNavigation.js
function MainHeader(props) {
  return(
    <header className="main-header">
      {props.children}
    </header>
  );
}

export default MainHeader;