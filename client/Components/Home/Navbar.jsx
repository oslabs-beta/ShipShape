import React from 'react';


function Navbar() {
    return(
        <div className='navbarContainer'>
            <div className='logoHeader'>
                <img id='dashboardLogo' src='./../assets/ShipShapeWhiteLogo.png' height='60px' width='60px'/> 
                <p className='shipShape'>ShipShape</p>
            </div>
            <div className='subjectContainer'>
                <div className='subjects'>Cluster</div>
                <div className='subjects'>Namespaces</div>
                <div className='subjects'>Pods</div>
                <div className='subjects'>Settings</div>
            </div>
        </div>
    )
};

export default Navbar;