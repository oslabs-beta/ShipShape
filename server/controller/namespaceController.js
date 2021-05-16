const k8sApi = require('./../k8sApi');


const namespaceController = {};

namespaceController.getNamespaces = async function(req, res, next){
  const data = await k8sApi.listNamespace();
  let namespaces = [];
  for(let i = 0; i < data.body.items.length; i += 1){
    let name = data.body.items[i].metadata.name;
    switch(name){
      case "kube-node-lease":
        break;
      case "kube-public":
        break;
      case "kube-system":
        break;
      default:
        namespaces.push(name);
    }
  }
  res.locals.namespaces = namespaces;
  return next();
}

module.exports = namespaceController;