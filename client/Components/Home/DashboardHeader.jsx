import React from 'react';


function DashboardHeader() {
    return(
        <div className='dashboardHeader'>           
            <a href="https://github.com/oslabs-beta/ShipShape" target='_blank'>
             <img src='https://www.sferalabs.cc/wp-content/uploads/github-logo-white.png' height='30px' width='50px'/>
          </a>
            <a id="help" href='#'>Help</a>
            <p id='import'>Import +</p>
        </div>
    )
};

export default DashboardHeader;