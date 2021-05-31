const k8sApi = require('./../k8sApi');
const cmd = require('node-cmd');
const Pod = require('../datasources/podConstructor');


const podController = {};

podController.getPodsRaw = async function(req, res, next){
  console.log('in the podController');
  const data = (await k8sApi.listNamespacedPod('default')).response.body.items;
  console.log(data);
  res.locals.pods = data;
  return next();
}


podController.getPodMetrics = async function(req, res, next){
  res.locals.podMetrics = await Pod.getMetrics();
  return next();
}

module.exports = podController;