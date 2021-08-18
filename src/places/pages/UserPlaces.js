// This is initially called from App.js at /places/new, or it could be called from the NavLinks bar, with "ADD PLACE" selected 
// SUMMARY: 
// this component fetches and lists all the places data that belong to the user
// For now, we will place dummy data here (call it DUMMY_PLACES variable), until we are ready to fetch data from the database
// this component returns a .filter of the DUMMY_PLACES array to find matching users and return to URL at App.js
import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from "../components/PlaceList";

// our array to hold data of places objects before we full-on create a backend database
const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'one of the most famous sky scrapers in the world',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/df/NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: { // we store within DUMMY_PLACES, a 'location' property that is an object of latitude and longitude properties
        lat: 40.7484405,
        lng: -73.9878531
    },
    creator: 'u1'
  }, 
  {
    id: 'p2',
    title: 'Emp. State Building',
    description: 'one of the most famous sky scrapers in the world',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/df/NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
        lat: 40.7484405,
        lng: -73.9878531
    },
    creator: 'u2'
  }
];


const UserPlaces = () => {
  // (eg. if location is stated as localhost:3000/lugia/places) userId = lugia because in App.js, we defined: /:userId/places
  const userId = useParams().userId;

  // filter returns new array if conditions are met inside the function
  //    filter: the value 'place' represents objects inside our DUMMY_PLACES array
  //            our filter looks through place.creator to see if it matches userId (eg. u1 === u1)
  // loops through DUMMY_PLACES (array of object items) and see if we match anything inside filter, and fill up our new array to return results
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
  
  // return our loadedPlaces array to <PlaceList />.
  // over there, we return a map function of this array, which it displays the <ul> of places held in <li>'s
  return <PlaceList items={loadedPlaces} />
};

export default UserPlaces;