const express = require('express');
const nodeController = require('../controller/nodeController');
const podController = require('../controller/podController');

const metricsServerRouter = express.Router();

metricsServerRouter.get('/pods', podController.getPodMetrics, (req, res) => {
  res.status(200).json(res.locals.podMetrics);
});

metricsServerRouter.get('/nodesPercent', nodeController.getNodePercents, (req, res) => {
  res.status(200).send(res.locals.nodePercents);
});

module.exports = metricsServerRouter;