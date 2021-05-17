import React, { useState } from 'react';
import LineChart from './LineChart.jsx';
import BarChart from './BarChart.jsx';
import HeatMap from './HeatMap.jsx';
import PodsTable from './PodsTable.jsx';

function Dashboard() {
     
   

    return(
      
            <div className='mainDashboard'>
                <LineChart />
                <BarChart />
                <HeatMap />
                <PodsTable/>
            </div>
        
    )

    
};

export default Dashboard;