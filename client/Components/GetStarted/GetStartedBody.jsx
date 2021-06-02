/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";

/*
This is the body get started page, it is bascially just a page of instruction
to help users get started using ShipShape.
*/

export default function GetStartedBody() {
  return (
    <div className="GetStartedBody">
      <div id="infoBox">
        <h1>Getting Started with ShipShape</h1>
        <br />
        If you're new here, here's some quick instructions on how to get
        started! Then we can begin the process of monitoring your cluster. Don't
        forget, for full functionality, make sure you have a metrics server
        deployed on your cluster. (Help with that coming soon!) If your
        kubeconfig is pointing propely to your cluster, allowing you to use your
        kubectl commands on your command line, then you're all set! Head on over
        to the Dashboard tab and you'll see your metrics. If not, make sure that
        your cluster administrator has allowed you a user account with access to
        cluster kubeclt commands. If you can access the cluster using kubectl
        commands you're good to go! This app automatically connects to your
        cluster using your kubeConfig file, so there's no need to create an
        account, or worry about us storing your data, this application only
        reads it! Once you are on your ShipSape dashboard, you'll start off
        looking at metrics for your pods, just click any of them in the table at
        the bottom of the screen to see their individual metrics. If you want a
        more hardware focused look, check out the Node View by clicking its
        button on the Navigation Bar!
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
        In order get the basic metrics out of this application, make sure that you have deployed a metrics
        server as well as prometheus.  To deploy a metrics server, open up a command line with
        access to the cluster and run this command,
        <br />
        <br /> "kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml"
        <br />
        <br />
        For even further monitoring capabilities,
        download and configure helm to be able to deploy helm charts to your
        cluster. The Helm installation docs can be found{" "}
        <a id="helm-install-here" href="https://helm.sh/docs/intro/install/">here!</a>
        <br />
        <br />
        Once installed, download/upgrade the Prometheus helm chart with this command.
        <br />
        <br />"helm repo add prometheus-community https://prometheus-community.github.io/helm-charts"
        <br />
        <br />
        Next, you'll want to create a namespace prometheus, to deploy prometheus inside.
        <br />
        And finally, deploy Prometheus to your cluster with
        <br />
        <br />"helm upgrade -i prometheus prometheus-community/prometheus --namespace prometheus ""
        <br />
        <br />
        This will deploy Prometheus to your cluster under the namespace, Prometheus.
        <br />
        <br />
        Any comments or concerns? The ShipShape dev team would love to hear from
        you! Email ShipShapeK8S@gmail.com to get in touch!
      </div>
      <div>
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
