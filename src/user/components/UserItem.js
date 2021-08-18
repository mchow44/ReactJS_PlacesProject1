// PATH CALLED FROM: start from App.js, then '/' url path call, which '/' calls to <Users> component, then <UsersList> (.map()'s the array of users), then finally here
// SUMMARY: This component displays the users as <Card> CSS stylized cards
// Detail Summary: 
//  to Start, go and look at Users.js, that file passed down USERS array as a {props.item} array to <UsersList> (UsersList.js file)
//  then, from UsersList.js, we pass the {props.item} item array to this <UserItem> component call here.
//    - <Card> is wrapped with one <div> and a className="card"
//    - <Avatar> is wrapped with one <div> surrounding the <img> tag. We style this and place inside the <Card></Card>
//  <Card> styles the card of the user displayed. Also, it will have custom insert of className="user-item__content" here to remove padding (padding: 0;) from Card.css where padding: 1rem;
//  the <Link> will be custom string literal made, so that it's dynamic, as it can use the to='url string' property to reload url page to the user's places assigned. 
//      for example: http://localhost:3000/ul/places, this will show the place for u1, and u1 is passed in from USERS array (from Users.js file) passed in as {props.id}
//      so far, we only have http://localhost:3000/ul/places set as the url path because we only have 'u1' in our USERS dummy data from Users.js
//  SideNote: The <h3> element below the <div className="user-item__info"> container will show placeCount property and a ternary operator to display a 'Place' or 'Places' string, so it will display 1 Place, or 2 Places
import React from 'react';
import { Link } from 'react-router-dom'; // <Link /> will be used below to define a dynamic path from userID

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './UserItem.css';

const UserItem = props => {
    return (
      <li className="user-item">
        <Card className="user-item__content">
          <Link to={`/${props.id}/places`}>
            <div className="user-item__image">
              <Avatar image={props.image} alt={props.name}/>
            </div>
            <div className="user-item__info">
              <h2>{props.name}</h2>
              <h3>
                {props.placeCount} {props.placeCount === 1 ? 'Place':'Places'}
              </h3>
            </div>
          </Link>
        </Card>
      </li>
    );
};


export default UserItem;