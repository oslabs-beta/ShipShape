import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard.jsx";
import DashboardHeader from "./DashboardHeader.jsx";
import Navbar from "./Navbar.jsx";

function Home() {
  const [dashboardView, setdashboardView] = useState("pod");

  function changeView(string) {
    // console.log(`state is starting at ${dashboardView}`);
    // console.log(`fired setView with ${string}`);
    setdashboardView(string);
    // console.log(`state is now ${dashboardView}`);

  }

  // useEffect(() => {
  //   changeView();
  // }, []);

  return (
    <div className="homeContainer">
      <DashboardHeader />
      <Navbar handler={changeView} />
      <Dashboard x={dashboardView}/>
    </div>
  );
}

export default Home;
