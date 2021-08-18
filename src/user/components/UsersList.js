// SUMMARY: this <UsersList> component returns the <ul> display of <UserItem> <li>'s in cards. Users.js file supplies the USERS array as {props.items} to this file here
// Detail Summary:
//    1. look to the return statement: we loop with a .map function on {props.items} array (it's USERS array from Users.js file)
//      1a. in callback function inside .map: we define "user" to represent each item within {props.items}
//      1b. {props.items} is an array passed from the component call from Users.js file
//      1c. each "user" we loop and look at, we display <UserItem> compoent, and within <UserItem>, it calls <Card> and <Avatar> to display the Users card look on the HTML page
// note: this is called from the Users.js file, which is originally called from the '/' path at App.js file
import React from 'react';

import UserItem from './UserItem'; // this <UserItem/> component will hold each users' <Card /> data
import Card from '../../shared/components/UIElements/Card';
import './UsersList.css';

const UsersList = props => {
    // we assume props.items is an array property holding the users
    // if 0, then empty array of users
    if (props.items.length === 0) {
      return (
        // "center" class is defined at index.css file outside
        <div className="center">
          <Card>
            <h2>No users found.</h2>
          </Card>
        </div>
      );
    } //end of if statement

    // if items array is not 0, then return the <UserItem />
    return (
      <ul className="users-list">
        {props.items.map(user => (
        <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.places}
        />
        ))}
      </ul>
    );
};


export default UsersList;