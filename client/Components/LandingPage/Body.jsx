import React from "react";
import { Link } from "react-router-dom";

export default function Body() {
  return (
    <div className="bodyDiv">
      <div id="intro" background="transparent">
        <h1>Welcome to ShipShape!</h1>
        <h2>A better way to monitor your Kubernetes Cluster</h2>
        <div id="buttonContainer">
          <Link to="/getStarted">
            <button className="getStartedButton">Get Started</button>
          </Link>
          <Link to="/dashboard">
            <button className="getStartedButton">My Dashboard</button>
          </Link>
        </div>
        <div className="imageContainer">
          <img
            id="dashImage"
            src="../../assets/dashboards.png"
            alt="Kubernetes Dashboard"
          />
        </div>
      </div>
      <div id="aboutUs">
        <h3>About Us</h3>
        <div className="cardContainer">
          <div className="aboutUsCards">
            <h4>Real Time Monitoring</h4>
            <p>
              Real Time monitoring the metrics that matter the most in your
              Kubernetes Cluster{" "}
            </p>
          </div>
          <div className="aboutUsCards">
            <h4>Send and Store</h4>
            <p>
              Continuously send and store the data related to CPU, Disk, and
              Memory usage
            </p>
          </div>
          <div className="aboutUsCards">
            <h4>Easy Visualization</h4>
            <p>
              View your cluster like never before with our clear and concise
              dashborad
            </p>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="featureText" id="topText">
          Track What Matters Most
        </div>
        <div className="featurePicture">
          <img src="../../assets/barss.png" />
        </div>
        <div className="featurePicture">
          <img src="../../assets/spdss.png" />
        </div>
        <div className="featureText" id="bottomText">
          To Catch Problems Before They Happen
        </div>
      </div>
      <div className="moreInfo">
        <h3>More Information</h3>
        <p>
          ShipShape is a Kubernetes monitoring tool designed to help you
          visualize the most important metrics of your Cluster at various levels
          of granularity. ShipSahpe can also track long-term performance, help
          debug errors, and offere potential configuration optimization
          suggestions. <br />
          ShipShape will connect to and monitor the real time metrics of a
          Kubernetes Cluster using a variety of graphs and the clusters
          components to assess over all and pod-specific health. We do this by
          connecting to the Metrics Server of a Kubernetes cluster and
          continuously send and store the data related to CPU, Disk, and Memory
          usage to get a look at the metrics over time. We then present these
          metrics in an easy to understand, actionable graphic display on your
          personal ShipShape dashboard.
          <br />
        </p>
      </div>
      <div className="bubbles">
        <div className="teamContainer">
          <div className="teamContainerHeader">Meet The ShipShape Team</div>
          <div className="profileContainer">
            <div className="teamCards">
              <img className="teamPicture" src="../../assets/brian.jpg" />
              <p>Brian Barr</p>
              <a href="https://github.com/brianbarr">Github</a>
              <a href="https://www.linkedin.com/in/barrbrian">LinkedIn</a>
            </div>
            <div className="teamCards">
              <img className="teamPicture" src="../../assets/ozi.jpeg" />
              <p>Ozi Oztourk</p>
              <a href="https://github.com/ozi-oztrk">Github</a>
              <a href="https://www.linkedin.com/in/ozi-oztourk/">LinkedIn</a>
            </div>
            <div className="teamCards">
              <img
                className="teamPicture"
                src="../../assets/rebeccaschell.jpg"
              />
              <p>Rebecca Schell</p>
              <a href="https://github.com/rschelly">Github</a>
              <a href="https://www.linkedin.com/in/rschelly/">LinkedIn</a>
            </div>
            <div className="teamCards">
              <img className="teamPicture" src="../../assets/whit.png" />
              <p>Whit Rooke</p>
              <a href="https://github.com/whitrooke">Github</a>
              <a href="www.linkedin.com/in/whit-rooke">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
    </div>
  );
}
