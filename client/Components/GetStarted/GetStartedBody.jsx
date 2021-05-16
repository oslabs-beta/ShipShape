import React from "react";
import { Link } from "react-router-dom";

export default function GetStartedBody() {
  return (
    <div className="GetStartedBody">
      <div id="infoBox">
        <h1>Getting Started with ShipShape</h1>
        <br />
        If you're new here, go ahead and sign up! Then we can begin the process
        of getting your cluster set up for monitoring. Been here before? If
        you've already logged in, you can go right to your dashboard by clicking
        the button below. Once you are on your ShipSape dashboard, click the
        settings button at the bottom of your nav bar to begin. We will provide
        you with all the steps necessary to link up your AWS or Google
        Kubernetes Cluster to ShipSape. Once we have collected some information
        from you about your AWS/Google cluster credentials, your cluster should
        get linked up and the monitoring can begin!
        <br />
        <br />
        There are several different key metrics ShipShape will help you look out
        for regarding the health and functionality of your clister, such as
        memory usage or pod efficiency. Information about your cluster's
        performance metrics should be nicely displayed in a series of graphs and
        tables to help you get a better overview of how your cluster is doing.
        Take a look around and see how ShipShape can help you keep on top of
        Kubernetes!
        <br />
        <br />
        Any comments or concerns? The ShipShape dev team would love to hear from
        you! Email getinshipshape@gmail.com to get in touch!
      </div>
      <div>
        <Link to="/LogIn">
          <button className="getStartedButton">Log In</button>
        </Link>
        <Link to="/dashboard">
          <button className="getStartedButton">My Dashboard</button>
        </Link>
        <Link to="/">
          <button className="getStartedButton">Go Back</button>
        </Link>
      </div>
    </div>
  );
}
