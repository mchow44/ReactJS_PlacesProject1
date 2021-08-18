import React from 'react'; 

import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

// passing in items property, and that will likely be the USERS array of user objects
// if items array is empty, then run the bottom logic, else map through array of USERS objects
const PlaceList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Places founds. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div> 
    );
  } // end of if-statement

  // for each items array, and this items array is passed in from a property as <PlaceList> is called outside somewhere else
  // which we will pass into place and run through our logic to assign a <PlaceItem /> compoent to each one
  // <PlaceItem /> returns all those properties below, and some other function recives those as "props"
  return (
    <ul className="place-list">
      {props.items.map(place => (
        <PlaceItem 
            key={place.id}
            id={place.id}
            image={place.imageUrl}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            coordinates={place.location}
        />
      ))}
    </ul>
    );

};

export default PlaceList;