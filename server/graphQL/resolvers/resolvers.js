const _ = require('lodash');
const mockPods = require('../mockData/rawPods.json');
const k8sApi = require('../../k8sApi.js');

//set to true to use mockData instead of pulling real k8s cluster data 
const mockMode = true;

const getPods = async () => {

}
module.exports = {
  Query: {
    pods: async () => {
     const result = mockMode ? mockPods : (await k8sApi.listNamespacedPod('default'));
    //  console.log(result);
     return result;
    },
    podsByNamespace(parent, args, context){
      return _.filter(mockMode ? mockPods : k8sApi.listNamespacedPod('default'), { metadata: { namespace : args.namespace } });
    },
    podsNotRunning(parent, args, context){
      return _.reject(mockMode ? mockPods : k8sApi.listNamespacedPod('default'), { status: { phase : 'Running' } })
    }
  }
}