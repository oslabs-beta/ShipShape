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

// podController.getPods = async function(req, res, next){
//   //going to get all the pods here, may start with just default namespace, but may 
//   //want to look into getting all the namespaces and seeing what pods are totally there

//   res.locals.pods = [];
//   for(let i = 0; i < res.locals.namespaces.length; i += 1){
//     // if we want only a single namespcae, we just need to make this array a single value
//     const rawPods = (await k8sApi.listNamespacedPod(res.locals.namespaces[i])).response.body.items;
    
//     //transform the data into individual pod objects and push them onto the array
//     for(let j = 0; j < rawPods.length; j += 1){
//       const pod = new Pod(rawPods[j]);
//       res.locals.pods.push(pod);
//     }
//   }
//   return next();
// }

podController.getPodMetrics = async function(req, res, next){
  res.locals.podMetrics = await Pod.getMetrics();
  return next();
}

module.exports = podController;