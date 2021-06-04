import React from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';
import Jump from 'react-reveal/Jump';

export default function Body() {
  return (
    <div className="bodyDiv">
      <div id="intro" background="transparent">
        <Pulse>
          <h1>Welcome to ShipShape!</h1>
          <h2>A better way to monitor your Kubernetes Cluster</h2>
        </Pulse>
        <div id="buttonContainer">
          <Link to="/getStarted">
            <button className="getStartedButton">Get Started</button>
          </Link>
          <Link to="/dashboard">
            <button className="getStartedButton">Dashboard Demo</button>
          </Link>
        </div>
        <div className="imageContainer">
          <img
            id="dashImage"
            src="../../assets/ShipShapeDashboard.png"
            alt="Kubernetes Dashboard"
          />
        </div>
      </div>
      <div id="aboutUs">
        <Jump>
          <h3>About Us</h3>
        </Jump>
        <div className="cardContainer">
          <div className="aboutUsCards">
            <h4>Real Time Monitoring</h4>
            <p>
              Real Time monitoring the metrics that matter the most in your
              Kubernetes Cluster
              {' '}
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
          <Fade left>
            <p id='pTag'>Track What Matters Most</p>
          </Fade>
        </div>
        <div className="featurePicture">
          <img src="../../assets/TrackWhatMatters.png" alt="trackwhatmatters" />
        </div>
        <div className="featurePicture last">
          <img src="../../assets/StopProblemsBefore.png" alt="tostopproblemsbefore" />
        </div>
        <div className="featureText" id="bottomText">
          <Fade right>
            <p>To Catch Problems Before They Happen</p>
          </Fade>
        </div>
      </div>
      <div className="moreInfo">
        <Pulse>
          <h3>More Information</h3>
        </Pulse>
        <p>
          ShipShape is a Kubernetes monitoring tool designed to help you
          visualize the most important metrics of your Cluster at various levels
          of granularity. ShipShape can also track long-term performance, help
          debug errors, and offer potential configuration optimization
          suggestions.
          <br />
          ShipShape will connect to and monitor the real time metrics of a
          Kubernetes Cluster using a variety of graphs and the clusters
          components to assess overall and pod-specific health. We do this by
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
          <Pulse>
            <div className="teamContainerHeader head">Meet The ShipShape Team</div>
          </Pulse>
          <div className="profileContainer">
            <div className="teamCards">
              <img className="teamPicture" src="../../assets/brian.jpg" alt="brianbarr" />
              <p>Brian Barr</p>
              <a href="https://github.com/brianbarr">Github</a>
              <a href="https://www.linkedin.com/in/barrbrian">LinkedIn</a>
            </div>
            <div className="teamCards">
              <img className="teamPicture" src="../../assets/ozi.jpeg" alt="ozioztourk" />
              <p>Ozi Oztourk</p>
              <a href="https://github.com/ozi-oztrk">Github</a>
              <a href="https://www.linkedin.com/in/ozi-oztourk/">LinkedIn</a>
            </div>
            <div className="teamCards">
              <img
                className="teamPicture"
                src="../../assets/rebeccaschell.jpg"
                alt="rebeccaschell"
              />
              <p>Rebecca Schell</p>
              <a href="https://github.com/rschelly">Github</a>
              <a href="https://www.linkedin.com/in/rschelly/">LinkedIn</a>
            </div>
            <div className="teamCards">
              <img className="teamPicture" src="../../assets/whit.png" alt="brianbarr" />
              <p>Whit Rooke</p>
              <a href="https://github.com/whitrooke">Github</a>
              <a href="www.linkedin.com/in/whit-rooke">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
      </div>
    </div>
  );
}
