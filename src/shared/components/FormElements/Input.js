import React, { useReducer, useEffect } from 'react'; 
// useReducer: 
//    For interconnect states (variables), instead of just one state management { useState } only manages one variable update: const [variable, setVariable]
//    It is different from useState because we can write logic to set the states/variables, instead of just updating values because useState only updates values
// when calling useReducer(); it will return a state with an array with exactly 2 elements
// useReducer calls a function that we define
// useEffect:
//    allows us to run some logic when some dependencies change (whenever our props changes). Run something after the first render
//    here, we run something after validation

// validate(value, validators) has 2 parameters (key string value, action type string name) and returns isValid = true/false
import { validate } from '../../util/validators'; // import validate function from validators.js, and use inside inputReducer(state, action)
import './Input.css';

// we call this function outside of our main Input component below because this function does not depend on anything inside function Input(props) {}
// this inputReducer() is called below from useReducer(inputReducer, ...)
// action is an object with properties: action.val, action.type
// if action.type = 'CHANGE', then run the return logic. return {...state, value: action.val, isValid: true}
//   - action.type is updated to { type: 'CHANGE' } from the changeHandler function calls at <input onChange={changeHandler}> <textarea onChange={changeHandler}>
//   - inside the changeHandler function, it updates the object within dispatch function call and gives it whatever properties we tell it
function inputReducer(state, action) {
  switch (action.type) {
    case 'CHANGE': 
      return { // here we return new state and re-render component
        ...state, // the spread operator takes the values of the old state
        value: action.val, // action.val is a key that we defined in the dispatch below
        isValid: validate(action.val, action.validators) // validates in real-time whether true/false
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true // set it to true once it triggers onBlur at <input> or <textarea>
      }
    default:
      return state; // return existing unchanged state
  }
}

function Input(props) {
  // intializing inputState.value = '' and inputState.isValid = false
  // start inputState as empty string: '', which we will pass this to <input value={inputState.value}> and <textarea={inputState.value}>
  //    - that means our textbox will start with value: '', or whatever we place inside, eg. value: 'charmander'
  // useReducer has one or two parameters (function, object). The 2nd parameter is optional, and it contains the default state/values
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '', // if props.value is not provided, default to ''
    isTouched: false, 
    isValid: props.initialValid || false // if props.initialValid is not provided, default to false
  });

  // pull out relevant/specified pieces of props and inputState for the useEffect function below this
  // props.onInput is called from <Input onInput={inputHandler}> from NewPlace.js
  // we use object destructuring - id, onInput, value and isValid as those are our local variables that are extracting data from the key value pairs of props and inputState (both are objects)
  const { id, onInput } = props; // we pull out what we need to use for useEffect below
  const { value, isValid } = inputState; // we pull out what we need to use for useEffect below

  // Summary: useEffect is a sideEffect trigger that listens for any changes to [id, value, isValid, onInput], and then triggers the onInput logic
  //          basically an Event listener on requested values: [id, value, isValid, onInput], if changed, then trigger logic onInput(id, value, isValid)
  // [] is the array of dependencies (array of things that should trigger this function)
  // {props.onInput} is called from NewPlace.js, NewPlace.js, and Auth.js, where we write <Input onInput={InputHandler}>
  // trigger onInput={inputHandler} once any of these variables: [id, value, isValid, onInput] changes
  // NOTE: our new InputHandler is created at form-hook.js, where it validates the entire form, and returns true/false to enable LOGIN or SWITCH to SIGNUP <Button>s
  useEffect( () => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  // WE WANT TO STORE ANY KEY/VALUE PAIRS w/ changeHandler function
  // changeHandler function call is attached to <input onChange={changeHandler}> or <textarea onChange={changeHandler}> below
  // any keystroke or action, then this changeHandler is called, and event object is passed in
  // dispatch function sends to inputReducer the action object, and here, we created our own keys, which are action.type, action.val properties
  //    action.type is updated to 'CHANGE'
  //    action.val is update to event.target.value - the value the user entered
  //    action.validators updated with array of Validation strings passed into 'CHANGE' action.type at inputReducer() function above
  const changeHandler = event => {
    dispatch({
      type: 'CHANGE', 
      val: event.target.value, // takes in the value of our entered value at the input box, and this dispatches to inputReducer function above
      validators: props.validators // this array is passed in from NewPlace.js where we called <Input>
                                   // this validators property will trigger and validate after each keyboard input {changeHandler} call
                                   // send this validators function call back up at the inputReducer function to assign our final state variables for inputState
                                   // eg. if we erase all strings in textbox, then error shows up
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    })
  };

  // we call {element} at the return statement below after our <label> tag is called
  // reduced version looks like: 
  //    const element = props.element === 'input' ? <input> : <textarea>
  // out here, we decide what text box (<input> or <textarea>) we want to render,
  //    eg. if we decide to use props.element that is textarea, we assign the text that is not "input"
  //    eg. <Input element='input'> or <Input element="{anything here for textarea text box}">
  const element = 
    props.element === 'input' ? (
      <input 
        id={props.id} 
        type={props.type} 
        placeholder={props.placeholder} 
        onChange={changeHandler} // this triggers the above changeHandler function, once any keystroke is pressed
        onBlur= {touchHandler} // onBlur: user had to click into it, and then click out of it (then touchHandler is triggered)
                               // onBlur allows the page to initially load without an error, until user focuses on this <input> box, and outfocuses it
                               // also, at inputReducer, we have ...state, so we don't lose the user's entered string on <input> box
        value={inputState.value}/>
    ) : (
      <textarea 
        id={props.id} 
        rows={props.rows || 3} // in case props.rows is not defined, we define box size default of 3 rows
        onChange={changeHandler}
        onBlur= {touchHandler} // onBlur: user had to click into it, and then click out of it (then touchHandler is triggered)
        value={inputState.value}/> // React has this value prop set here, instead of <textarea>value</textarea>
    );

  return (
    // {element} - rendering the textbox: <input> or <textarea.
    // if inputState is invalid:
    //    - At <div className>, (we highlight in red), by assigning class="form-control--invalid"
    //    - After {element}, the logic will trigger true on left side, to allow {props.errorText} to display
    // within <label htmlFor>, htmlFor is the React way of saying <label for="">
    // our inputState React useReducer is passed below to decide if false, then print {props.errorText}
    <div className={`form-control ${!inputState.isValid && inputState.isTouched && `form-control--invalid`}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element} 
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>    
  );
};

export default Input;