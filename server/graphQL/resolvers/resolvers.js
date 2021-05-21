const { isObject, find } = require('lodash');
// const mockPods = require('../mockData/rawPods.json');
// const mockPodMetrics = require('../mockData/rawPodMetrics.json')
// const mockNodes = require('../mockData/rawNodeShort.json')
// const mockNodeMetrics = require('../mockData/rawNodeMetricsShort.json') //using short rn b/c I don't have up-to-date full
// const nodePercentages = require('../mockData/nodesPercentages.json')
const k8sApi = require('../../k8sApi.js');
const fetch = require('node-fetch');
const podData = require('../../constructors/podConstructor.js')
const nodeData = require('../../constructors/nodeConstructor.js');
// const { mockServer } = require('@graphql-tools/mock');

//set to true to use mockData instead of pulling real k8s cluster data 
const mockMode = false;
const appUrl = 'http://localhost:3000'

//helper function that acts as Object.assign but deeply
const mergeDeep = (target, source) => {
  // console.log('merging deeply')
  for (const key in source) {
    if (isObject(source[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      mergeDeep(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
  // console.log(target);
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
      /** ORIGINAL CODE
      const pods = (await k8sApi.listNamespacedPod('default')).response.body.items;
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
    */

      /** NEW CODE  */
      const podsApi = (await k8sApi.listNamespacedPod('default')).response.body.items;
      const podsCmd = (await podData.getMetrics()).items
      // console.log(podsCmd);
      //Brute force approach to merging these two datasources by cycling through to match on pod name and  container name
      //should be refactored using only forEach, or better yet a findOne style method would improve performance;
      // I also feel like we should fold container status into this query as well
      // question though - how closely do we want to match original data source? This could allow us to build a graphQL tool
      // maybe use a lodash function https://lodash.com/docs/4.17.15; this will likely have a similar time complexity,
      // but it will be more imperative and easy to read.
      const podArray = []
      podsApi.forEach((pod) => {
        const mergedPod = podsCmd.reduce((original, metrics) => {
          // console.log(original.metadata.name, metrics.metadata.name);
          if (original.metadata.name == metrics.metadata.name) {
            original.spec.containers.forEach(container => {
              metrics.containers.reduce((origCont, metricCont) => {
                if(origCont.name == metricCont.name){
                  // console.log('Im here')
                  return mergeDeep(origCont, metricCont);
                } else {
                  return origCont;
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
    nodes: async (parent, args, context, info) => {
      const nodes = (await k8sApi.listNode('default')).response.body.items
      // console.log(mockNodes);
      nodes.forEach(node => {
        node.status.allocatable.ephemeralStorage = node.status.allocatable["ephemeral-storage"];
        console.log(node.status.allocatable.ephemeralStorage );
        node.status.nodeName = node.metadata.name
      });
      return nodes
    }
  },
  // Pod: {

  // },
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
  // Container: {
  //   usage: async (parent, args, context, info) => {
  //     // console.log(parent);
  //     const { name, podName, namespace } = parent;
  //     if(!podName) return {cpu: null, memory: null};
  //     const podMetrics = await podData.getMetrics(namespace, podName);
  //     // const podMetrics = metricsResp.items;

  //     // console.log(podMetrics.container);
  //     const { usage } = find(podMetrics.containers, { name });
  //     // console.log(usage);
  //     return usage;
  //   },
  // },
};
