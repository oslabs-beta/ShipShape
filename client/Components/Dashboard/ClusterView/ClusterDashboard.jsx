import React, { useState } from 'react';
import CpuChart from './CPUChart.jsx';
import MemoryChart from './MemoryChart.jsx';
import NetworkTransmitted from './NetworkTransmitted.jsx';
import ClusterFilteringOptions from './ClusterFilteringOptions.jsx';

/*
This is the view displayed when cluster view is clicked on the nav bar.
The cluster view displays the metrics of the cluster as a whole. This
cluster dashboard displays 3 line charts that display the CPU usage over
time, the memory usage over time, and the network pressure over time.

We are storing the data recieved from the query, passing it down to each of the
graphs.

NOTE: we may move the query to the home component if we impliment context api
*/

const ClusterDashboard = () => {
  const [chartDurationHours, setChartDurationHours] = useState(6);

  return (
    <div className="ClusterDashboard">
      <ClusterFilteringOptions
        chartDurationHours={chartDurationHours}
        setChartDurationHours={setChartDurationHours}
      />
      <MemoryChart chartDurationHours={chartDurationHours} />
      <CpuChart chartDurationHours={chartDurationHours} />
      <NetworkTransmitted chartDurationHours={chartDurationHours} />
    </div>
  );
};

export default ClusterDashboard;
