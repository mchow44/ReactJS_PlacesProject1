import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook'; // our own custom hook that returns formState and function inputHandler
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth = () => {

  // creates auth object
  const auth = useContext(AuthContext); // use this at the authSubmitHandler function below to trigger upon login

  // sets initial state of isLoginMode to true, because we don't want "Your Name" sign up box to appear unless this is false
  // true - it enables our return logic to display only email + password + Login button
  // false - enables Your name + email + password + Sign-Up button
  const [isLoginMode, setIsLoginMode] = useState(true);

  // useForm is our custom hook that returns the validation
  // inputHandler and setFormData are functions returned from useForm, custom hook
  //    - we then take this inputHandler and give it to Input.js file, from our return <Input onInput={inputHandler}>
  //    - at Input.js, {props.onInput} is triggered by the useEffect whenever our values change so it can go back to form-hook to dispatch any form validation to enable a true/false
  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '', // empty initially on our form inputs
      isValid: false
    },
    password: {
      value: '', // password also empty initially on our form inputs
      isValid: false // starts false to signify it's invalid
    }  
  }, false);

  // this switchModeHandler function is triggered at the onClick event of:
  //    <Button onClick={switchModeHandler}>SWITCH TO SIGNUP</Button>
  // our switchModeHandler will handle updating our true/false of our isLoginMode state
  // setIsLoginMode accepts any defined variable as a boolean
  //    - I called it variable toggle because it can then invert between true and false every time the switchModeHandler is called
  //    - we can call it any variable inside setIsLoginMode
  //    - with isLoginMode=true, it enables us to have this extra <Input> for "Your Name" to sign up registration
  //
  // setFormData (which this function comes from our useForm hook) 
  //    - it readily accepts two parameters: (inputData, formValidity) inputData-object, formValidity-boolean
  const switchModeHandler = () => {
    if (!isLoginMode) { // if isLoginMode=false (sign-up mode), then form validity logic will start here
      setFormData(
        {
          ...formState.inputs, 
          name: undefined 
        }, 
        formState.inputs.email.isValid && formState.inputs.password.isValid
      ); // end of setFormData function
    } else { // if we're in the login mode (not sign-up mode), then preserve the inputs data by passing in all formState.inputs from previous state
      setFormData({
        ...formState.inputs, 
        name: {
          value: '',
          isValid: false
        }
      }, false); 
    }
    setIsLoginMode(toggle => !toggle);
  };

  // we will have this to wrap our <form> logic, where it will be triggered once we click on button to submit "LOGIN"
  // it's listening to <button type="submit"> below
  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); // log our input states to show what user input into our formState
    auth.login(); // it triggers to update user context to being logged in, which then updates <NavLinks> to trigger logged in links on navbar
  }


  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && ( // with isLoginMode=false, it enables us to have this extra <Input> for "Your Name" for signing up
          <Input 
            element="input" 
            id="name"
            type="text" 
            label="Your Name" 
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        <Input 
          element="input" 
          id="email" 
          type="email" 
          label="E-Mail" 
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input 
          element="input" 
          id="password" 
          type="password" 
          label="Password" 
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP' }
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
    </Card>
  )
}


export default Auth;