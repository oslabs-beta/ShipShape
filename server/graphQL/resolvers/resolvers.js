const _ = require('lodash');
const mockPods = require('../mockData/rawPods.json');
const mockPodMetrics = require('../mockData/rawPodMetrics.json')
const mockNodes = require('../mockData/rawNodeShort.json')
const mockNodeMetrics = require('../mockData/rawNodeMetricsShort.json') //using short rn b/c I don't have up-to-date full
const nodePercentages = require('../mockData/nodesPercentages.json')
const k8sApi = require('../../k8sApi.js');
const fetch = require('node-fetch');
const podData = require('../../constructors/podConstructor.js')
const nodeData = require('../../constructors/nodeConstructor.js');
const { mockServer } = require('@graphql-tools/mock');

//set to true to use mockData instead of pulling real k8s cluster data 
const mockMode = false;
const appUrl = 'http://localhost:3000'

//helper function that acts as Object.assign but deeply
const mergeDeep = (target, source) => {
  for (const key in source) {
    if (_.isObject(source[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      mergeDeep(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
  return target;
};

/**
 * Useful Docs:
 * On accessing grandparents in resolvers https://github.com/graphql/graphql-js/issues/1098
 * a
 */

module.exports = {
  Query: {
    getPods: async (parent, args, context, info) => {
      const pods = mockMode ? mockPods : (await k8sApi.listNamespacedPod('default')).response.body.items;
      //this is an ugly hack to pass the name and namespace context down to containers.
      //a better system would be able to access this grandparent data directly
      //a seconary strategy will be to add a conditional that only runs this loop when container data will later be queried
      pods.forEach(pod => { 
        if(pod.status.phase !== 'Running') return;
        pod.spec.containers.forEach(container => {
          container.podName = pod.metadata.name;
          container.namespace = pod.metadata.namespace;
      })
    })
      return pods
    },
    nodes: async (parent, args, context, info) => {
      const nodes = (mockMode ? mockNodes : (await k8sApi.listNode('default'))).response.body.items
      // console.log(mockNodes);
      nodes.forEach(node => node.status.nodeName = node.metadata.name);
      return nodes
    }
  },
  Pod: {

  },
  NodeStatus: {
    usage: async (parent, args, context, info) => {
      const { nodeName } = parent;
      const nodeMetrics = (await nodeData.getNodeMetrics(nodeName));
      // console.log(nodeMetrics.usage);
      return nodeMetrics.usage
    },
    usagePercent: async (parent, args, context, info) => {
      const { nodeName } = parent;
      const perTable = (await nodeData.getPercentages(nodeName))[0];
      const nodePercent = {
        cpu: perTable['CPU%'][0],
        memory: perTable['MEMORY%'][0],
        cpuCores: perTable['CPU(cores)'][0],
        memoryBytes: perTable['MEMORY(bytes)'][0]
      }
      return nodePercent;
    }
  },
  Container: {
    usage: async (parent, args, context, info) => {
      // console.log(parent);
      const { name, podName, namespace } = parent;
      if(!podName) return null;
      const podMetrics = mockMode
        ? mockPodMetrics
        : await podData.getMetrics(namespace, podName);
      // const podMetrics = metricsResp.items;

      // console.log(podMetrics.container);
      const { usage } = _.find(podMetrics.containers, { name });
      // console.log(usage);
      return usage;
    },
  },
};
