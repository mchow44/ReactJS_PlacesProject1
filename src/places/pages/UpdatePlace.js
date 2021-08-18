import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook'; 
import './PlaceForm.css';

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

const UpdatePlace = () => {
  // (eg. if we say localhost:3000/places/tyranitar) placeId = tyranitar
  const placeId = useParams().placeId; 

  // initialize state of isLoading=true, to detail we are loading data still
  const [isLoading, setIsLoading] = useState(true);

  // use array destructuring to get what is returned from useForm
  // useForm takes in two values as parameters: useForm(initialInputs, initialFormValidity)
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    }, 
    false // this form should be invalid initially because it starts blank? Our <Button> will be disabled, per logic below 
  );

  // does our placeId match to DUMMAY_PLACES[i].id (eg. tyranitar or p1, where p1 will equal p.id)
  // only returns one item to identified places, which in this case it's returning an object, and storing to identifiedPlace
  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId)

  // useEffect controls the state/changes of [setFormData, identifiedPlace], so setFormData and identifiedPlace will not cause an infinite loop re-rendering during every re-render cycle
  //    - this handles any async/await delays because sometimes it takes a minute to get data retrieved from a server
  //    - setFormData state will not change, and identifiedPlace will not change
  // setFormData will run logic at Input.js to assign all values retrieved from identifiedPlace.title and identifiedPlace.description
  // setFormData accepts two values (object, boolean)
  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true
          },
          description: {
            value: identifiedPlace.description,
            isValid: true
          }
        }, 
        true // this form should be valid initially because it loads pre-stored value from identifiedPlace. Our <Button> will be enabled, per logic below 
      );
    }
    setIsLoading(false);
   }, [setFormData, identifiedPlace]);

  // we will bind this UpdateSubmitHandler to the onSubmit attribute of the <form> tag below
  // <form onSubmit={placeUpdateSubmitHandler}>
  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); // so we can see what is stored at formState.inputs
                                   // because we binded UpdateSubmitHandler to onSubmit at <form> wrapped tag below, we will also console log our formState.inputs
  }

  // if no place exists for our defined placeId to match p.id above, run this logic
  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  // database loading logic
  // logic to run if title.value does not exist: 
  // if we have a title value, then skip this if statement and go to next return to render <form> below
  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}> 
      <Input 
        id="title" 
        element="input" 
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Place enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value} // .inputs came from the { useForm } state hook to update formState values. title.value came from useForm call above
        initialValid={formState.inputs.title.isValid} // look at { useReducer } at form-hook.js to know which defined properties belong to formState object
                                                      // this {props.initialValue} will go into Input.js to determine validity of initial
      />
      <Input 
        id="description" 
        element="textarea" 
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Place enter a valid description (min 5 characters)"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value} // .inputs came from the { useForm } state hook to update formState values. description.value came from useForm call above
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};


export default UpdatePlace;