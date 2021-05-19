const _ = require('lodash');
const mockPods = require('../mockData/rawPods.json');
const mockPodMetrics = require('../mockData/rawPodMetrics.json')
const mockNodes = require('../mockData/rawNodeShort.json')
const nodeMetrics = require('../mockData/rawNodeMetricsShort.json') //using short rn b/c I don't have up-to-date full
const nodePercentages = require('../mockData/nodesPercentages.json')
const k8sApi = require('../../k8sApi.js');
const fetch = require('node-fetch');
const podData = require('../../constructors/podConstructor.js')
const nodeData = require('../../constructors/nodeConstructor.js');
const { mockServer } = require('@graphql-tools/mock');

//set to true to use mockData instead of pulling real k8s cluster data 
const mockMode = true;
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
    getPods: async (parent, args, context, info) => {
      // console.log(mock.pods);
      const pods = mockMode ? mockPods : (await k8sApi.listNamespacedPod('default')).response.body.items;
      //this is an ugly hack to pass the name and namespace context down to containers.
      //a better system would be able to access this grandparent data directly
      //a seconary strategy will be to add a conditional that only runs this loop when container data will later be queried
      // pods.forEach(pod => pod.spec.containers.forEach(container => {
      //   container.podName = pod.metadata.name;
      //   container.namespace = pod.metadata.namespace;
      // }))
      return pods
    },
    getNodes: async (parent, args, context, info) => {
      const nodes = mockMode ? mockPodMetrics : (await k8sApi.listNode('default')).response.body.items
      return nodes
    }
  },
  Container: {
    usage: async (parent, args, context, info) => {
      // console.log(parent);
      const { name, podName, namespace } = parent;
      const podMetrics = mockMode ? mockPodMetrics : await podData.getMetrics(namespace, podName);
      // const podMetrics = metricsResp.items;
    
      // console.log(podMetrics.container);
      const { usage } = _.find(podMetrics.containers, { name })
      console.log(usage);
      return usage;
    }
  }
}