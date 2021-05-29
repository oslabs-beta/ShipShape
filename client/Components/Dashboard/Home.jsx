import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard.jsx";
import DashboardHeader from "./DashboardHeader.jsx";
import Navbar from "./NavBarItems/Navbar.jsx";


/* 
This is the top most component of our dashboard. From here, everything is rendered, 
including a header, a nav bar, and the actual metric monitoring dashboards. We set state 
here to see which 'view' of the dashboard the user has clicked on, and pass that state
to both the nav bar and the dashboard components. When a user clicks on a different view
in the nav bar, the state string set here gets update, and that update is reflected on the 
dashboad. 
*/

const Home = () => {
  const [dashboardView, setdashboardView] = useState("pod"); 
  function changeView(string) {
    setdashboardView(string);
  };
  return (
    <div className="homeContainer">
      <DashboardHeader />
      <Navbar handler={changeView} />
      <Dashboard view={dashboardView}/>
    </div>
  );
}

export default Home;