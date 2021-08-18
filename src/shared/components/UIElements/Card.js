import React from 'react';

import './Card.css';

// use this <Card> and merge the component with more specific styles from this className="card"
// {props.className} in case we want to add other styles to this <Card> component call. (eg. <Card className="extra-styling">)
//    - for example, look at <UserItem> (within UserItem.js), we see <Card> has an extra styling class, <Card className="user-item__content">, which that class is in UserItem.css
// {props.children} is predefined by React to allow <Card></Card> to enclose code, basically hamburger style it
//    SideNote: For {props.children} being called, while this </div> here will be the bottom when called. Look to UsersList.js, and you'll see </Card> to signify the bottom wrapper for </div>
const Card = props => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
