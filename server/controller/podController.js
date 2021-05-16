const k8sApi = require('./../k8sApi');


const podController = {};

podController.getPods = async function(req, res, next){
    //going to get all the pods here, may start with just default namespace, but may 
    //want to look into getting all the namespaces and seeing what pods are totally there

    for(let i = 0; i < res.locals.namespaces.length; i += 1){
        res.locals.pods = {};
        res.locals.pods[res.locals.namespaces[i]] = await k8sApi.listNamespacedPod(res.locals.namespaces[i]);
    }
    return next();
}

module.exports = podController;