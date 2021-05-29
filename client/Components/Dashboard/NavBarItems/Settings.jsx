import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa'

/* 
Currently empty, will eventually be populated with instructions for how to use ShipShape
*/

const Settings = () => {
    
    return(
        <div className='settings' >
            <button className='btnDashboard'>
                Settings
                <FaCog />
            </button>
           
        </div>
    )
    
};

export default Settings;