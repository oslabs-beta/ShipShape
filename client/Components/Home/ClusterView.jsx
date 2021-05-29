import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const ClusterView = ({ handler }) => {
  // const [clicked, setClicked] = useState(false);

  return (
    <div>
      <button className="btnDashboard" onClick={() => handler("cluster")}>
        Cluster View
        <FaAngleDown />
      </button>
      {/* {clicked ? (
        <div className="dropDown">
          <ul>
            <li>Hello World</li>
            <li>Hello World</li>
            <li>Hello World</li>
            <li>Hello World</li>
          </ul>
        </div>
      ) : null} */}
    </div>
  );
};

export default ClusterView;