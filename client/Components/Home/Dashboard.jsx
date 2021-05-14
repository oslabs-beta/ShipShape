import React from 'react';
import LineChart from './LineChart.jsx';
import BarChart from './BarChart.jsx';
import HeatMap from './HeatMap.jsx';

function Dashboard() {
    return(
        <div className='mainDashboard'>
            <LineChart />
            <BarChart />
            <HeatMap />
            <div className='podsTable'>TABLE FOR ALL PODS DETAIL GOES HERE</div>
        </div>
    )
};

export default Dashboard;