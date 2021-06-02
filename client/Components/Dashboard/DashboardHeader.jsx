import React from 'react';
import { Link } from 'react-router-dom';

/*
This is the header that sits at the top of the dashboard home page.
it has links to our github repo and clicking help will take users
to our geting started page to view some Instructions for how to get
started
*/

const DashboardHeader = () => {
  return (
    <div className="dashboardHeader">
      <Link id="help" to="/getStarted">
        Help
      </Link>
      <a href="https://github.com/oslabs-beta/ShipShape" target="_blank" rel="noreferrer">
        <img
          src="https://www.sferalabs.cc/wp-content/uploads/github-logo-white.png"
          height="30px"
          width="50px"
          alt="Github Logo"
        />
      </a>
    </div>
  );
};

export default DashboardHeader;
