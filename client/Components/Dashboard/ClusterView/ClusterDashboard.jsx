import React, { useEffect, useState } from "react";
import { filter, find } from "lodash";
import LineChart from "./StreamingNetworkPressure.jsx";
import StreamingCpuChart from "./StreamingCpuChart.jsx";
import StreamingMemoryChart from "./StreamingMemoryChart.jsx";
import StreamingNetworkPressure from "./StreamingNetworkPressure.jsx";

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
  return (
    <div className="ClusterDashboard">
      <StreamingMemoryChart />
      <StreamingCpuChart />
      <StreamingNetworkPressure />
    </div>
  );
};

export default ClusterDashboard;
