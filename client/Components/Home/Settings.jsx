import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa'



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