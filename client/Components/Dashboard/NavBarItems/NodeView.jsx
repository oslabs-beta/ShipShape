import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

/* 
This is the tab on the nav bar for the node view. When it is clicked, 
the dashboard will change to display metrics and graphs for the whole
node. 
The click handler function is passed down from the nar bar, so when 
node view is clicked, the handler updates state to the string 'node'
so the dashboard knows to render the node view. 
*/


const NodeView = ({ handler }) => {
 
  return (
    <div>
      <button className="btnDashboard" onClick={() => handler("node")}>
        Node View
        <FaAngleDown />
      </button>
    </div>
  );
};

export default NodeView;
