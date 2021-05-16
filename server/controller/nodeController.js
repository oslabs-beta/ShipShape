const k8sApi = require('./../k8sApi');
const Node = require('./../constructors/nodeConstructor');

const nodeController = {};

//for development purposes, ability to view raw data of all nodes 
nodeController.getNodesRaw = async function(req, res, next){
  const data = await k8sApi.listNode('default');
  console.log(data);
  res.locals.nodes = data;
  return next();
}

//for production, return a nice neat array of node objects
nodeController.getNodes = async function(req, res, next){
  res.locals.nodes = []; 
  for(let i = 0; i < res.locals.namespaces.length; i += 1){
    const rawNodes = (await k8sApi.listNode(res.locals.namespaces[i])).response.body.items;
    for(let j = 0; j < rawNodes.length; j += 1){
      const node = new Node(rawNodes[j]);
      res.locals.nodes.push(node);
    }
  }
  return next();
}

module.exports = nodeController;