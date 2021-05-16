import React from 'react';
import { Link } from "react-router-dom";

function DashboardHeader() {
    return(
        <div className='dashboardHeader'>  
            <Link id="help" to="/getStarted">Help</Link>       
            <p id='import'>Import +</p>
            <a href="https://github.com/oslabs-beta/ShipShape" target='_blank'>
             <img src='https://www.sferalabs.cc/wp-content/uploads/github-logo-white.png' height='30px' width='50px'/>
          </a>
        </div>
    )
};

export default DashboardHeader;