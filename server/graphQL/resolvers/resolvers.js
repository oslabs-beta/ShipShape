const _ = require('lodash');
const mockPods = require('../mockData/rawPods.json');
const mockPodMetrics = require('../mockData/rawPodMetrics.json')
const k8sApi = require('../../k8sApi.js');
const fetch = require('node-fetch');
const podData = require('../../constructors/podConstructor.js')
const nodeData = require('../../constructors/nodeConstructor.js')

//set to true to use mockData instead of pulling real k8s cluster data 
const mockMode = false;
const appUrl = 'http://localhost:3000'

//helper function that acts as Object.assign but deeply
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

/**
 * Useful Docs:
    * On accessing grandparents in resolvers https://github.com/graphql/graphql-js/issues/1098
    * 
 */



module.exports = {
  Query: {
    pods: async () => {
      const pods = mockMode ? mockPods : (await k8sApi.listNamespacedPod('default')).response.body.items;
      // const podsCmd = mockMode ? mockPodMetrics : (await fetch('/metrics/pods').items)
      pods.forEach(pod => pod.spec.containers.forEach(container => {
        container.podName = pod.metadata.name;
        container.namespace = pod.metadata.namespace;
      }))
/**
      //Brute force approach to merging these two datasources by cycling through to match on pod name and  container name
      //should be refactored using only forEach, or better yet a findOne style method would improve performance;
      // I also feel like we should fold container status into this query as well
      // question though - how closely do we want to match original data source? This could allow us to build a graphQL tool
      // maybe use a lodash function https://lodash.com/docs/4.17.15; this will likely have a similar time complexity,
      // but it will be more imperative and easy to read.
      // const podArray = []
      // podsApi.forEach((pod) => {
      //   const mergedPod = podsCmd.reduce((original, metrics) => {
      //     if (original.metadata.name == metrics.metadata.name) {
      //       console.log('weve got a pod match', original.metadata.name);
      //       original.spec.containers.forEach(container => {
      //         metrics.containers.reduce((origCont, metricCont) => {
      //           if (origCont.name == metricCont.name){
      //             console.log('container match', origCont.name);
      //             return mergeDeep(origCont, metricCont);
      //           }
      //         }, container)
      //       })
      //     }
      //     return original;
      //   },pod);

      //   podArray.push(mergedPod);
      // })
*/
      return pods
    },
  },  
  Container: {
    usage: async (parent, args, context) => {
      // console.log(parent);
      const { name, podName } = parent;
      const podMetrics = mockMode ? mockPodMetrics : podData.getMetrics(podName);
      // const podMetrics = metricsResp.items;
      console.log(' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Pod:', podName,'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ');
      console.log(' ================================= Container:',name,'=============================');
      console.log(podMetrics.items);
      // const usage = _.filter(podMetrics, { containers: [ { name} ]})
      // console.log(usage);
      return {
        cpu: '100z'
      };
      return usage;
    }
    // podsByNamespace(parent, args, context){
    //   return _.filter(mockMode ? mockPods : k8sApi.listNamespacedPod('default'), { metadata: { namespace : args.namespace } });
    // },
    // podsNotRunning(parent, args, context){
    //   return _.reject(mockMode ? mockPods : k8sApi.listNamespacedPod('default'), { status: { phase : 'Running' } })
    // }
  }
}