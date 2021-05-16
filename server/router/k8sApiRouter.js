const k8sApi = require('./../k8sApi');
const express = require('express');
const namespaceController = require('./../controller/namespaceController');
const nodeController = require('./../controller/nodeController');
const podController = require('./../controller/podController');

const k8sApiRouter = express.Router();

k8sApiRouter.get('/nodes', nodeController.getNodes, (req, res) =>{
    console.log(res.locals.nodes);
    res.status(200).json(res.locals.nodes)
})



k8sApiRouter.get('/namespaces', namespaceController.getNamespaces, (req, res) =>{
    console.log(res.locals.namespaces);
    res.status(200).json(res.locals.namespaces);
})

k8sApiRouter.get('/pods', namespaceController.getNamespaces, podController.getPods, (req, res) =>{
    console.log(res.locals.pods);
    res.status(200).json(res.locals.pods);
})

module.exports = k8sApiRouter