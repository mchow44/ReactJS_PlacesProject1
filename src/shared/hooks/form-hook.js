// created this custom hooks file to customize <form> validation logic
// our {useReducer} handles the changed (multiple) states of our <form>, and it passes in {!formState.isValid} 
// only {useState} handles one singular value/state, while {useReducer} can handle multiple 
import { useCallback, useReducer } from 'react'; // useCallback wraps a function to avoid infinite loop from useEffect to rerun at Input.js

// formReducer is called when we activate our dispatch call (which we call at the InputHandler function)
// we intend to use this logic to set formIsValid=true/false
//    - returning the formIsValid disables/enables the <Button>ADD PLACE</Button> at the NewPlace.js file
//    - Note: to enable <Button>ADD PLACE</Button>, then formIsValid must pass validation .isValid=true, and thus formIsValid=true
// values/properties within the action object are coming from the dispatch function call
//    - and that dispatch is called at 'const InputHandler', so we can access action.type, action.value, action.isValid and action.inputId
//    - action object properties is coming from <Input onInput={InputHandler}>, look for onInput at Input.js
const formReducer = (state, action) => {
  switch (action.type) { // action.type comes from dispatch below. {type: 'INPUT_CHANGE'}
    case 'INPUT_CHANGE': // run logic to update our input state update
      let formIsValid = true; 
      // loop through all inputs: state.inputs.title and state.inputs.description
      // the for loop decides whether formIsValid is true or false. false defines for the form not validating
      for (const inputId in state.inputs) { // our useReducer function below contains the inputs object property
        if (!state.inputs[inputId]) { // used at Auth.js function
          continue; // if state.inputs[inputId] is undefined, then we continue to the next iteration of the loop, bypassing the form validity logic below
        }
        if (inputId === action.inputId) { 
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      } // end of for loop, we continue to return statement because our case statement is not over yet
      // at this return is when our forloop is done analyzing whether all our inputs are isValid=true or isValid=false
      // then preserve all out state.inputs data/value with ... spread operator
      return {
        ...state, // copying over our existing input state
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid } // action.inputId, where inputId is given from dispatch
        },
        isValid: formIsValid // formIsValid is defined at the logic above before this return statement
                            // once title and description is returned as isValid = true, then the final formIsValid is true, unlocking the <Button> below
      };//end of return for 'INPUT_CHANGE' case
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      };
    default: // if case is not 'INPUT_CHANGE'
      return state;
  }
};

// we are exporting this useForm function as our own homemade hook
export const useForm = (initialInputs, initialFormValidity) => {
  // for useReducer, our 2nd parameter is an object {} that stores the initialized state values
  //    - which these values will be passed into formReducer to handle the returned state/values, aka state.inputs, state.inputs[].isValid
  // we can access formState.inputs.title... formState.inputs.description... or formState.isValid
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs, // initialize to initialInputs
    isValid: initialFormValidity // initialize to initialFormValidity 
  });

  // dispatch sends the values straight to the formReducer function
  // when dispatch is called, it re-renders the component, aka NewPlace.js or UpdatePlace.js is run again
  //    - at formReducer function outside, it analyzes action.type, case: 'INPUT_CHANGE'
  //    - we have another function setFormData below, and it analyzes action.type as case: 'SET_DATA'
  // InputHandler linked to onInput function call from Input.js, and within Input.js, it is <Input onInput={InputHandler}>
  // this function gives the values passing in from <Input onInput={InputHandler}>
  // and that function analyzes the state and gives action object as the return
  //
  // when in Auth.js, we call <Input onInput={inputHandler}>, as inputHandler is given to Auth.js from the return of this useForm hook
  // then we pass in the values at onInput at Input.js, and then it passes back to the parameters here, in summary, <Input id="name">, then here, inputId: "name"
  const InputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type:'INPUT_CHANGE', 
      inputId: id, 
      value: value, 
      isValid: isValid});
  }, []);

  // we only call setFormData function at UpdatePlace.js, because we use this to load exising data
  // SUMMARY: setFormData loads data from database and displays out to <form> <input>'s.... at UpdatePlace.js
  // if we call setFormData function, then it dispatches to our latest 'SET_DATA' case logic above
  //    - we pass in the values across as action object:
  //    - action.type, action.inputs, action.formIsValid, all available at the case switch statements above
  //    - inputData and formValidity is passed from outside as 2 paramters: (object, boolean), when we call this setFormData function
  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity
    });
  }, []);

  // finally, we call useForm hook at another function w/this return logic
  // we call useForm at NewPlace.js or UpdatePlace.js
  // formState is the first value returned, then both functions: InputHandler and setFormData 
  return [formState, InputHandler, setFormData];


}; // end of useForm function


