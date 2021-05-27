const express = require('express');
const prometheusController = require('./../controller/prometheusController.js');

const prometheusRouter = express.Router();

prometheusRouter.post('/install', (req, res) =>{
  res.status(200).json('Prometheus Fired Up')
})