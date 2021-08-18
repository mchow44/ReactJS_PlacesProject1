// SUMMARY: It is first called at the App.js file, which is the "/" path call, so this component is our very first call
//          simply the main start of displaying of Users cards. This component Users.js file holds the USERS array of user objects
//          and we pass this along to UsersList to parse this out to <ul> <li> card components at that file to display
import React from 'react';

import UsersList from '../components/UsersList'; // we can now call <UsersList> at this file

const Users = () => {
    // USERS is an array of user objects, which will be passed to <UserLists> {props.items} variable
    // at UsersList.js file, we will pass this USERS array as {props.item} and run a .map function to display them out as <Card /> component items
    const USERS = [
        {
          id: 'ul', 
          name: 'Matt Chow', 
          image: 
            'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          places: 3
        }
    ];
    return <UsersList items={USERS} />;
};

export default Users;