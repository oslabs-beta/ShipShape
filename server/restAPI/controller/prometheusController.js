const fetch = require('node-fetch');
const { spawn } = require('child_process');

const prometheusURL = 'http://127.0.0.1:9090/api/v1/';

const prometheusController = {};

/**
 * Stretch Feature: install prometheus programmatically for users
 * TODO: Add instructions for installing helm to the readme
 * TODO: Automatically download helm chart for prometheus
 * TODO: Run Helm Chart to Create Prometheus Deployment inside the K8S Cluster
 * TODO: Check if all the Prometheus Pods are Running?
 */
prometheusController.isUp = async (req, res, next) => {
  const queryStr = `${prometheusURL}query?query=up`;

  try {
    const response = await fetch(queryStr);
    res.locals.query = await response.json();
    return next();
  } catch (err) {
    return next(err);
  }
};

prometheusController.portPrometheus = (req, res, next) => {
  try {
    const process = spawn('kubectl', ['--namespace=default', 'port-forward', 'deploy/prometheus-server', '9090'])

    process.stdout.on('data', data => {
      console.log(`stdout: ${data}`);
    });

    process.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    process.on('close', (code) => {
      if (code === 1) console.log('PROMETHEUS ALREADY IN USE NUM NUM');
      console.log(`child process exited with code ${code}`);
    });

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = prometheusController;
