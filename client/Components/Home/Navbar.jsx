import React from 'react';


function Navbar() {
    return(
        <div className='navbarContainer'>
            <div className='logoHeader'>
                <img id='dashboardLogo' src='./../assets/ShipShapeWhiteLogo.png' height='40px' width='40px'/> 
                <p className='shipShape'>ShipShape</p>
            </div>
            <div className='subjectContainer'>
                <div className='subjects'>Cluster</div>
                <div className='subjects'>Namespaces</div>
                <div className='subjects'>Pods</div>
            </div>
        </div>
    )
};

export default Navbar;