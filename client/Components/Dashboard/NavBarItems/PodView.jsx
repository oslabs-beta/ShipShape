import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

/* 
This is the tab on the nav bar for the pod view. When it is clicked, 
the dashboard will change to display metrics and graphs for the whole
pod. 
The click handler function is passed down from the nar bar, so when 
pod view is clicked, the handler updates state to the string 'pod'
so the dashboard knows to render the pod view. 
*/

const podView = ({ handler }) => {
  return (
    <div>
      <button className="btnDashboard ah" onClick={() => handler("pod")}>
        Pod View
        <FaAngleDown />
      </button>
    </div>
  );
};

export default podView;
