const cmd = require('node-cmd');
const Node = require('../../graphQL/datasources/nodeConstructor');

const nodeController = {};

// this should eventually be abstracted to use the constructor function like NodePercents
nodeController.getNodeMetrics = async function(req, res, next) {
  const rawMetrics = cmd.runSync('kubectl get --raw /apis/metrics.k8s.io/v1beta1/nodes/');
  const regex = '///';
  const metrics = rawMetrics.data.replace(regex, '');
  res.locals.nodeMetrics = JSON.parse(metrics);
  return next();
};

nodeController.getNodePercents = async function(req, res, next) {
  res.locals.nodePercents = await Node.getPercentages();
  return next();
};

module.exports = nodeController;
