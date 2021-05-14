import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPageContainer from './LandingPage/LandingPageContainer.jsx';
// import SignIn from './SignIn'
import Home from './Home/Home.jsx'



function App() {
  return (
    <div className='app'>
    <BrowserRouter>
      {/* essentially a switch statement that chooses the component to render based on the path */}
      <Switch>
        <Route exact path='/' render={() =>  <LandingPageContainer />} />
        <Route path='/getStarted' render={() => <SignIn/>} />
        <Route path='/dashboard' render={() => <Home/>} />
      </Switch>
    </BrowserRouter>
    </div>
  

  );
}


export default App;



