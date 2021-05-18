const _ = require('lodash');
const mockPods = require('../mockData/rawPods.json');
const mockPodMetrics = require('../mockData/rawPodMetrics.json')
const k8sApi = require('../../k8sApi.js');
const { xor } = require('lodash');

//set to true to use mockData instead of pulling real k8s cluster data 
const mockMode = true;

const mergeDeep = (target, source) => {

  for (const key in source){
    if (_.isObject(source[key])){
      if(!target[key]) Object.assign(target, { [key]: {} });
      mergeDeep(target[key], source[key]);
    } else{
      Object.assign(target, { [key]: source[key] });
    }
  }

  return target;
}

module.exports = {
  Query: {
    pods: async () => {
      const podsApi = mockMode ? mockPods : (await k8sApi.listNamespacedPod('default')).response.body.items;
      const podsCmd = (mockMode ? mockPodMetrics : (await 'hello')).items

      //Brute force approach to merging these two datasources by cycling through to match on pod name and  container name
      //should be refactored using only forEach, or better yet a findOne style method would improve performance;
      // I also feel like we should fold container status into this query as well
      // question though - how closely do we want to match original data source? This could allow us to build a graphQL tool
      // maybe use a lodash function https://lodash.com/docs/4.17.15; this will likely have a similar time complexity,
      // but it will be more imperative and easy to read.
      const podArray = []
      podsApi.forEach((pod) => {
        const mergedPod = podsCmd.reduce((original, metrics) => {
          if (original.metadata.name == metrics.metadata.name) {
            console.log('weve got a pod match', original.metadata.name);
            original.spec.containers.forEach(container => {
              metrics.containers.reduce((origCont, metricCont) => {
                if (origCont.name == metricCont.name){
                  console.log('container match', origCont.name);
                  return mergeDeep(origCont, metricCont);
                }
              },container)
            })
          }
          return original;
        },pod);

        podArray.push(mergedPod);
      })
      return podArray;
    },
    podsByNamespace(parent, args, context){
      return _.filter(mockMode ? mockPods : k8sApi.listNamespacedPod('default'), { metadata: { namespace : args.namespace } });
    },
    podsNotRunning(parent, args, context){
      return _.reject(mockMode ? mockPods : k8sApi.listNamespacedPod('default'), { status: { phase : 'Running' } })
    }
  }
}