const fetch = require('node-fetch');
const cmd = require('node-cmd');

const prometheusURL = 'http://127.0.0.1:9090/api/v1/'

const prometheusController = {};

/**
 * Install Helm Chart
 * Run Helm Chart to Create Prometheus Deployment inside the K8S Cluster
 * Wait??
 * Check if all the Prometheus Pods are Running?
 */

prometheusController.downloadHelmChart = (req, res, next) => {

}

prometheusController.runHelmChart = (req, res, next) => {

}

prometheusController.isUp = async (req, res, next) => {
  let queryStr = prometheusURL +'query?query=up';
  const response = await fetch(queryStr);
  let body = await response.json();
  res.locals.query = body;
  next();
}

prometheusController.portPrometheus = (req, res, next) => {
  let command = 'kubectl --namespace=default port-forward deploy/prometheus-server 9090';
  cmd.run(command);
  next();
}

module.exports = prometheusController;