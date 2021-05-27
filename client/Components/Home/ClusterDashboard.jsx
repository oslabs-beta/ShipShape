import React, { useEffect, useState } from "react";
import { filter, find } from "lodash";
import LineChart from "./LineChart.jsx";
import StreamingLineChart from "./StreamingLineChart.jsx";

function ClusterDashboard() {

  return (
    <div className="ClusterDashboard">
      <StreamingLineChart/>
      <LineChart />
      {/* <other other line chart />  */}
    </div>
  );
}

export default ClusterDashboard;
