const k8sApi = require('./../k8sApi');
const cmd = require('node-cmd');
const Node = require('../datasources/nodeConstructor');



const nodeController = {};

//for development purposes, ability to view raw data of all nodes 
nodeController.getNodesRaw = async function(req, res, next){
  const data = await k8sApi.listNode('default');
  // res.locals.nodes = data.response.toJSON();
  res.locals.nodes = data;
  // console.log(res.locals.nodes);
  return next();
}

//for production, return a nice neat array of node objects
// nodeController.getNodes = async function(req, res, next){
//   res.locals.nodes = []; 
//   for(let i = 0; i < res.locals.namespaces.length; i += 1){
//     const rawNodes = (await k8sApi.listNode(res.locals.namespaces[i])).response.body.items;
//     for(let j = 0; j < rawNodes.length; j += 1){
//       const node = new Node(rawNodes[j]);
//       res.locals.nodes.push(node);
//     }
//   }
//   return next();
// }

//this should eventually be abstracted to use the constructor function like NodePercents
nodeController.getNodeMetrics = async function(req, res, next){
  const rawMetrics = cmd.runSync(`kubectl get --raw /apis/metrics.k8s.io/v1beta1/nodes/`);
  let regex = '///';
  const metrics = rawMetrics.data.replace(regex, '');
  res.locals.nodeMetrics = JSON.parse(metrics);
  return next();
}

//just a middleware to try out k8sAPI commands on, DELETE BEFORE PRESENTING!
// nodeController.nodeTest = async function(req, res, next){
//   let result = await k8sApi.listNode();
//   res.locals.test = result;
// }

nodeController.getNodePercents = async function(req, res, next){
  res.locals.nodePercents = await Node.getPercentages();
  console.log(res.locals.nodePercents);
  return next();
}

module.exports = nodeController;