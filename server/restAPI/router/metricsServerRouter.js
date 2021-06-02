const cmd = require('node-cmd');
const express = require('express');
const nodeController = require('./../controller/nodeController.js');
const podController = require('./../controller/podController.js');

const metricsServerRouter = express.Router();

// metricsServerRouter.get('/nodes', nodeController.getNodeMetrics, (req, res) => {
//   res.status(200).json(res.locals.nodeMetrics);
// })  

metricsServerRouter.get('/pods', podController.getPodMetrics, (req, res) =>{
  res.status(200).json(res.locals.podMetrics);
})

metricsServerRouter.get('/nodesPercent', nodeController.getNodePercents, (req, res) =>{
  res.status(200).send(res.locals.nodePercents);
})

module.exports = metricsServerRouter;