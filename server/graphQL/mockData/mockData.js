const pods = require('../mockData/rawPods.json');
const podMetrics = require('../mockData/rawPodMetrics.json')
const nodes = require('./rawNodeShort.json')
const nodeMetrics = require('./rawNodeMetricsShort.json') //using short rn b/c I don't have up-to-date full
const nodePercentages = require('./nodesPercentages.json')

module.export = {
  pods,
  podMetrics,
  nodes,
  nodeMetrics,
  nodePercentages,
}