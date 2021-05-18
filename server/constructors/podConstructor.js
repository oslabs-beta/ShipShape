const cmd = require('node-cmd');
const Pod = {};

Pod.getMetrics = async function(pod = ''){
  const rawMetrics = cmd.runSync(`kubectl get --raw /apis/metrics.k8s.io/v1beta1/pods/${pod}`);
  let regex = '///';
  const metrics = rawMetrics.data.replace(regex, '');
  return JSON.parse(metrics);
}

module.exports = Pod;