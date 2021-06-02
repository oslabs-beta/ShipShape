import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Body from './Body.jsx'

/*
This is the landing page for our website, which renders components 
for the header, body of the page, and the footer. This is the top
level component for all things related to the landing page. 
*/


export default function LandingPageContainer() {
    return(
        <div className='LandingPageContainer'>
           <Header />
           <Body />
           <Footer />
        </div>
    )
};