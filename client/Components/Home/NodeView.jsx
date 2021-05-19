import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const NodeView = ({ handler }) => {
  // const [clicked, setClicked] = useState(false);

  // function handleClick() {
  //   console.log("clicked node view!");
  //   setClicked(!clicked);
  // }

  return (
    <div>
      <button
        className="btnDashboard"
        onClick={() => handler('node')}
      >
        Node View
        <FaAngleDown />
      </button>
    </div>
  );
};

export default NodeView;
