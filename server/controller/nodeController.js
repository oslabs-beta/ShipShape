const k8sApi = require('./../k8sApi');


const nodeController = {};

nodeController.getNodes = async function(req, res, next){
  
  const data = await k8sApi.listNode('default');
    console.log(data);
    res.locals.nodes = data;
    return next();
}

module.exports = nodeController;