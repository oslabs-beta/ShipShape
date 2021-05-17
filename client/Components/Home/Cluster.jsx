import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa'



const Cluster = () => {

    const [clicked, setClicked] = useState(false);

    return(
        <div  >
            <button className='btnDashboard ah' onClick={() => setClicked(!clicked)}>
                Cluster
                <FaAngleDown />
            </button>
            {
                clicked ? (
                    <div className='dropDown'>
                        <ul>
                        <li>Hello World</li>
                        <li>Hello World</li>
                        <li>Hello World</li>
                        <li>Hello World</li>
                        </ul>
                        
                    </div>
                ) : (
                    null
                )
                
            }
            
           
        </div>
    )
};

export default Cluster;