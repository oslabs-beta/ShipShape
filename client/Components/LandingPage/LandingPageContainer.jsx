import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Body from './Body.jsx';

export default function LandingPageContainer() {
  return (
    <div className="LandingPageContainer">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}
