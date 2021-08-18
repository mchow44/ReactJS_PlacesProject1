// Enter this from App.js <NavLinks> clicked button to "localhost:3000/places/new"
// SUMMARY: It's only a page of <form> and <input>, where it has error validation checking, and returns red if incorrect
// 
// technically we could write regular <input> tags along with <label> tags as well
//    but, we want validator capabilities & logic, so we create our own React <Input> component
// Generally, our return statement is structured like this:
// <form> 
//   <label for>
//   <input>
import React from 'react'; 

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';

// <Input validators>:
//   - validators={[]} will take an array of pre-defined validation rules (look at import { VALIDATOR_REQUIRE } from '../../...' above)
//   - At validators.js, we will code the boolean logic to determin action.type ourselves and return the final intrepreted logic
const NewPlace = () => {

    // our custom hook, useForm():
    //   - useForm returns a two value array [formState object, InputHandler function], so we use array destructuring - use any name we want to define the destructured items from the array
    //   - initialInputs will be passed as an object to the first parameter of useForm. Initialize to empty data strings/variables
    //   - initialFormValidity passes in false to the second parameter of useForm function. Initialize to false
    //   SUMMARY: our logic, for useReducer to handle multiple states/values, is stored inside useForm() hook
    //            useForm logic just handles returning formState.isValid for our <Button>ADD PLACE</Button> to turn on
    const [formState, InputHandler] = useForm(
      {
        title: {
          value: '', // initialize to blank title name
          isValid: false // initialize to false as we start
        },
        description: {
          value: '', // initialize to blank description text
          isValid: false
        },
        address: {
          value: '',
          isValid: false
        }
      },
      false 
    );


    // here, we can use this to send our data back to the backend server
    const placeSubmitHandler = event => {
      event.preventDefault();
      console.log(formState.inputs); // send this formState.inputs data to the backend, ignoring formState.isValid because it's not needed
    };

    // className = "place-form" defines general size of our <form> box
    // onSubmit is listening to <Button type="submit"> and triggers when they button is clicked
    return (
      <form className="place-form" onSubmit={placeSubmitHandler}> 
        <Input 
          id="title"
          element="input" // Input.js decides whether we use <input> or <textarea>
          type="text" 
          label="Title" 
          validators={[VALIDATOR_REQUIRE()]} // this passes in what action.type validator string we want to run logic boolean on
          errorText="Please enter a valid title."
          onInput={InputHandler} // binds to useEffect function at Input.js
        />
        <Input 
          id="description"
          element="textarea" // Input.js decides whether we use <input> or <textarea>
          label="Description" 
          validators={[VALIDATOR_MINLENGTH(5)]} // this passes in what action.type validator string we want to run logic boolean on
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={InputHandler}
        />
        <Input 
          id="address"
          element="input" // Input.js decides whether we use <input> or <textarea>
          label="Address" 
          validators={[VALIDATOR_REQUIRE()]} // this passes in what action.type validator string we want to run logic boolean on
          errorText="Please enter a valid address."
          onInput={InputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}> 
          ADD PLACE 
        </Button>
      </form>
    );
  };
  
  export default NewPlace;