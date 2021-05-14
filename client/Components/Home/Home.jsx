import React from 'react';
import Dashboard from './Dashboard.jsx'
import DashboardHeader from './DashboardHeader.jsx'
import Navbar from './Navbar.jsx';




function Home() {
    return(
        <div className='homeContainer'>
          <DashboardHeader />
          <Navbar />
          <Dashboard />
        </div>
    )
};

export default Home;