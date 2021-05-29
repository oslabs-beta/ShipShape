import React, { useEffect, useState } from "react";
import { filter, find } from "lodash";
import LineChart from "./StreamingNetworkPressure.jsx";
import StreamingCpuChart from "./StreamingCpuChart.jsx";
import StreamingMemoryChart from "./StreamingMemoryChart.jsx";
import StreamingNetworkPressure from './StreamingNetworkPressure.jsx';

function ClusterDashboard() {

  return (
    <div className="ClusterDashboard">
      <StreamingMemoryChart/>
      <StreamingCpuChart/>
      <StreamingNetworkPressure />
    </div>
  );
}

export default ClusterDashboard;
