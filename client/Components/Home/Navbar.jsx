import React from 'react';
import Cluster from './Cluster.jsx';
import Namespaces from './Namespaces.jsx';
import Pods from './Pods.jsx';
import Settings from './Settings.jsx';

function Navbar() {
    return(
        <div className='navbarContainer'>
            <div className='logoHeader'>
                <img id='dashboardLogo' src='./../assets/ShipShapeWhiteLogo.png' height='60px' width='60px'/> 
                <p className='shipShape'>ShipShape</p>
            </div>
            <div className='subjectContainer'>
                <Cluster />
                <Namespaces />
                <Pods />
                <Settings />
            </div>
        </div>
    )
};

export default Navbar;