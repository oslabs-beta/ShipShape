const cmd = require('node-cmd');
const express = require('express');
const nodeController = require('./../controller/nodeController.js')

const metricsServerRouter = express.Router();

metricsServerRouter.get('/nodes', nodeController.getNodeMetrics, (req, res) => {
  console.log(res.locals.nodes.metrics);
  res.status(200).json(res.locals.nodes.metrics);
})

module.exports = metricsServerRouter;