const k8sApi = require('./../k8sApi');


const namespaceController = {};

namespaceController.getNamespaces = async function(req, res, next){
    const data = await k8sApi.listNamespace();
    console.log(data);
    let namespaces = [];
    for(let i = 0; i < data.body.items.length; i += 1){
        namespaces.push(data.body.items[i].metadata.name);
    }
    res.locals.namespaces = namespaces;
    return next();
}

module.exports = namespaceController;