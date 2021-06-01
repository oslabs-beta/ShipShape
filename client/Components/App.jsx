import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPageContainer from "./LandingPage/LandingPageContainer.jsx";
// import SignIn from './SignIn'
import Home from "./Dashboard/Home.jsx";
import GetStartedPage from "./GetStarted/GetStartedPage.jsx";
import LogInPage from "./LogIn/LogInPage.jsx";
import NotFound from "./NotFound.jsx";


/*
*
* This is the main app component that renders everythig in ShipShape. 
* We use react router to serve the different pages of the website.
*
*/

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        {/* essentially a switch statement that chooses the component to render based on the path */}
        <Switch>
          <Route exact path="/" render={() => <LandingPageContainer />} />
          <Route path="/getStarted" render={() => <GetStartedPage />} />
          <Route path="/dashboard" render={() => <Home />} />
          <Route path="/LogIn" render={() => <LogInPage />} />
          <Route component={NotFound} /> 
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
