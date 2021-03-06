const express = require('express');
const prometheusController = require('../controller/prometheusController');

const prometheusRouter = express.Router();

// route to deploy prometheus onto the Cluster
prometheusRouter.post('/install', (req, res) =>{
  res.status(200).json('Prometheus Fired Up')
});

// trial route to get data from prometheus after nodeporting
prometheusRouter.get('/up', prometheusController.isUp, (req, res) => {
  res.status(200).json(res.locals.query);
});

prometheusRouter.get('/port', prometheusController.portPrometheus, (req, res) => {
  res.status(200).send('port on');
});

module.exports = prometheusRouter;
