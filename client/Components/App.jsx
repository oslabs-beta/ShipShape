import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPageContainer from "./LandingPage/LandingPageContainer.jsx";
import Home from "./Dashboard/Home.jsx";
import GetStartedPage from "./GetStarted/GetStartedPage.jsx";
import NotFound from "./NotFound.jsx";

/*
 *
 * This is the main app component that renders everythig in ShipShape.
 * We use react router to serve the different pages of the website.
 *
 */

function App() {
  console.log("nothing to see here, get out of our console");
  console.log(`
  ____ _  _ _ ___  ____ _  _ ____ ___  ____ 
  [__  |__| | |__] [__  |__| |__| |__] |___ 
  ___] |  | | |    ___] |  | |  | |    |___ `);
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <LandingPageContainer />} />
          <Route path="/getStarted" render={() => <GetStartedPage />} />
          <Route path="/dashboard" render={() => <Home />} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
