import React, { useEffect, useState } from "react";
import { filter, find } from "lodash";
import LineChart from "./LineChart.jsx";
import StreamingCpuChart from "./StreamingCpuChart.jsx";
import StreamingMemoryChart from "./StreamingMemoryChart.jsx";

function ClusterDashboard() {

  return (
    <div className="ClusterDashboard">
      <StreamingLineChart/>
      <StreamingMemoryChar/>
      <LineChart />
      {/* <other other line chart />  */}
    </div>
  );
}

export default ClusterDashboard;
