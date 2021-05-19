const cmd = require('node-cmd');
const Parser = require('table-parser');

const Node = {};

Node.getPercentages = async function(node = ''){
  const percents = await cmd.runSync(`kubectl top node ${node}`);
  let percentObj = Parser.parse(percents.data);
  return percentObj;
}

Node.getNodeMetrics = async function(node = ''){
  const rawMetrics = cmd.runSync(`kubectl get --raw /apis/metrics.k8s.io/v1beta1/nodes/${node}`);
  let regex = '///';
  const metrics = rawMetrics.data.replace(regex, '');
  return await JSON.parse(metrics);
}

module.exports = Node