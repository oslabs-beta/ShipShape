<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/oslabs-beta/ShipShape">
    <img src="./client/assets/ShipShapeLogo.png" alt="Logo" length="350px" width="350px">
  </a>

  <h3 align="center">ShipShape</h3>

  <p align="center">
    Kubernetes Cluster Monitoring Made Easy
    <br /><br />
    <a href="https://www.getinshipshape.io/"><strong>getinshipshape.io</strong></a>
    <br />
    <br />
   
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#demo">Demo</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#looking-ahead">Looking Ahead</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

ShipShape is an open-source Web App for Kubernetes monitoring. ShipShape allows Users to track numerous Kubernetes Cluster metrics with easy to interpret graphs at varying levels of granularity.

Key features include:

<!-- * User authentication and authorization -->

- A facilitated access of internal Kubernetes environment without having to expose it to outside traffic
- Instructions for auto-deployment of Prometheus for time-series metrics
- GraphQL service to abstract PromQL queries for frontend developers
- Threre diffenent dashboard views of Kubernetes clusters (cluster, node, and pod view)
- Graphs that display important metrics
- Dynamic time-range and filtering selection for cluster metric data

### Built With

- [Kubernetes](https://kubernetes.io/)
- [Prometheus](https://prometheus.io/)
- [React](https://reactjs.org/)
- [Chart JS](https://www.chartjs.org/)
- [GraphQL](https://graphql.org)
- [Webpack](https://webpack.js.org/)
- [Node JS/Express](https://nodejs.dev)
- [Jest](https://jestjs.io/)

## Demo

![](https://s6.gifyu.com/images/ShipShapeReadmeDemo.gif)

## Getting Started

To get a local copy up and running, follow these steps:

1. Fork and/or clone this repo to get started
2. Npm install in the ShipShape root directory
3. Npm run dev or run build then npm start
4. Navigate to local host 8080 (or 3000, depending on startup method, respectively)
5. You will be taken to the ShipShape landing page. Click the 'Getting Started' button to view more specific instructions for how to hook up your Kubernetes cluster to ShipShape for metric monitoring.
6. Once these 'Getting Started' instructions have been followed, navigate to your dashboard to see how easy ShipShape makes cluster monitoring!

### Prerequisites

1.  Installed on your local machine, Kubectl and Helm command line tools.
2.  A metrics server installed inside the cluster, if it is not standard with your cluster service. For metrics server deployment, see the 'Getting Started' page for exact details.
3.  Expose metrics using Prometheus from a Kubernetes cluster. You can either expose a live cluster or use [MiniKube](https://minikube.sigs.k8s.io/docs/start/).

### Setup

See the Getting Started page on the <a href="https://www.getinshipshape.io/"><strong>ShipShape</strong></a> website!

### Demo Mode

To see a working demo of ShipShape:

Navigate to the <a href="https://www.getinshipshape.io/"><strong>ShipShape</strong></a> dashbaord!

<!-- CONTRIBUTORS -->

## Contributors

Brian Barr - [GitHub](https://github.com/BarrBrian/) - [LinkedIn](https://www.linkedin.com/in/barrbrian/)

Ozi Oztourk - [GitHub](https://github.com/ozi-oztrk/) - [LinkedIn](https://www.linkedin.com/in/ozi-oztourk/)

Rebecca Schell - [GitHub](https://github.com/rschelly/) - [LinkedIn](https://www.linkedin.com/in/rschelly/)

Whit Rooke - [GitHub](https://github.com/Whitrooke) - [LinkedIn](https://www.linkedin.com/in/whit-rooke)

## Looking Ahead

-More testing
-More graphs for more metric monitoring
-Prometheus Auto-Deployment
-Potentially adding state management tools (Redux/Context API) for faster queries
-UI Optimization
-More filtering options for “Cluster View” metrics (Adjust smoothing and step parameters, Look at past dates, Filter queries by namespace, service, or application)
-Organizations and user permissions
