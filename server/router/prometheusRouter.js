const express = require('express');
const prometheusController = require('./../controller/prometheusController.js');

const prometheusRouter = express.Router();

//route to deply prometheus onto the Cluster
prometheusRouter.post('/install', (req, res) =>{
  res.status(200).json('Prometheus Fired Up')
})

module.exports = prometheusRouter;