import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

/* 
Currently empty, will eventually be populated with instructions for how to use ShipShape
*/

const Settings = () => {
  return (
    <div className="settings">
      <Link to="/getStarted">
        <button className="btnDashboard">
          Settings
          <FaCog />
        </button>
      </Link>
    </div>
  );
};

export default Settings;
