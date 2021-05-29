import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

/* 
This is the tab on the nav bar for the cluster view. When it is clicked, 
the dashboard will change to display metrics and graphs for the whole
cluster. 
The click handler function is passed down from the nar bar, so when 
cluster view is clicked, the handler updates state to the string 'cluster'
so the dashboard knows to render the cluster view. 
*/

const ClusterView = ({ handler }) => {

  return (
    <div>
      <button className="btnDashboard" onClick={() => handler("cluster")}>
        Cluster View
        <FaAngleDown />
      </button>
    </div>
  );
  
};

export default ClusterView;