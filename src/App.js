// over here in App.js, we control which pages are displayed to which URL
import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'; 
// we accessed BrowserRouter and declared it as Router, Route, and Redirect components, 
// while these declared Router, Route, Redirect and Switch components each have their own features

import Users from './user/pages/Users'; 
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Auth from './user/pages/Auth';
import UpdatePlace from './places/pages/UpdatePlace';
import { AuthContext } from './shared/context/auth-context';

// START: <Users /> starts at root "/" page, so we go to Users.js file at path './user/pages/Users' to start our logic
// We place <MainNavigation> above <Switch> wrapper because <MainNavigation> is the pink nav bar. We make this visible no matter what Route we load to page
//    - Thus, we have <MainNavigation> nav link bar at every page
//    - look in MainHeader.css, and we will see <main> is selected for pushing a margin to bottom of its nav bar:
//    - margin-top: 5rem; <-- pushes the Users to a margin of 5rem away from nav bar, nav bar <MainHeader> stays static on top
// <Router> wraps around for all paths defined, similar to <div> containers
// <Route> let's us define the url path string and place the component/logic inside
//    - also note that "exact" property will make sure that it must be that exact url page path (eg: localhost:3000/ as exactly '/' path)
// <Redirect> evaluates back to defined default page. 
//    - In this case it is default redirect to '/' path
//    - It can bypass/redirect a failing page path load when it is not at the 'exact' (exact is defined in <Route>) url path
// <Switch> component makes sure Redirect doesn't get evaluated to go back to '/'
//    - before we even added the <Switch> component, we saw that our entire code gets evaluated from top to bottom (<Route> down to <Redirect>)
//    - because the code reads each component from top to bottom, we would end up reading the <Redirect> at the bottom, and it processes the redirects...
//    - with <Switch> called, theen we would only stay/stick at one called <Route> path and not leave to another <Route> evaluation
// <Route path="/:userId">, userId is a dynamic segmemt declared from UserPlaces.js file

// <Route path="/places/:placeId"> must be below <Route ="/places/new">. Order matters here
//    - because when we access /places/new, new will be interpreted as :placeId, and it will never go to /places/new
//    - instead, it will go to /places/:placeId 
//    - /:placeId can be anything in the url, like /places/tyranitar, it will default this to /places/:placeId 
const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else { // if not logged in
    routes = (
      <React.Fragment>
        <Route path="/" exact> 
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth"> 
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </React.Fragment>
    );
  }

  return (
  <AuthContext.Provider 
    value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}
  >
    <Router> 
      <MainNavigation /> 
      <main>
        {routes}
      </main>
    </Router>
  </AuthContext.Provider>
  );
};

export default App;
