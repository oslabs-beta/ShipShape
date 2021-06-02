const cmd = require('node-cmd');

const Pod = {};

Pod.getMetrics = async function (namespace = undefined, pod = undefined) {
  let rawMetrics;
  if (!namespace || !pod) rawMetrics = cmd.runSync('kubectl get --raw /apis/metrics.k8s.io/v1beta1/pods/');
  else rawMetrics = cmd.runSync(`kubectl get --raw /apis/metrics.k8s.io/v1beta1/namespaces/${namespace}/pods/${pod}`);
  const regex = '///';
  const metrics = rawMetrics.data.replace(regex, '');
  return JSON.parse(metrics);
};

module.exports = Pod;
