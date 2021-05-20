import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const PodView = ({ handler }) => {
  // const [clicked, setClicked] = useState(false);

  return (
    <div>
      <button className="btnDashboard ah" onClick={() => handler("pod")}>
        Pod View
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

export default PodView;
