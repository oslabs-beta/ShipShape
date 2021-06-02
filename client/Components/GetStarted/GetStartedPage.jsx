import React from 'react';
import Header from '../LandingPage/Header.jsx';
import GetStartedBody from './GetStartedBody.jsx';

/*
This is the top level component of the Get Started page of the site. It borrows
the headerfrom the landing page, and renders a get stated body component to house
all the info a user might to get started using ShipShape
*/

export default function GetStartedPage() {
  return (
    <div className="GetStartedPageContainer">
      <Header />
      <GetStartedBody />
    </div>
  );
}
