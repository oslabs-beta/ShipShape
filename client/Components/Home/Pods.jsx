import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa'



const Pods = ({ data1 }) => {

 
  return (
    <div  >
        <button className='btnDashboard'>
            Pods
            <FaAngleDown />
        </button>
       
    </div>
  );
    
};

export default Pods;