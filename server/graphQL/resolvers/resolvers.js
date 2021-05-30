const { isObject, find } = require('lodash');
// const mockPods = require('../mockData/rawPods.json');
// const mockPodMetrics = require('../mockData/rawPodMetrics.json')
// const mockNodes = require('../mockData/rawNodeShort.json')
// const mockNodeMetrics = require('../mockData/rawNodeMetricsShort.json') //using short rn b/c I don't have up-to-date full
// const nodePercentages = require('../mockData/nodesPercentages.json')
const k8sApi = require('../../k8sApi.js');
const podData = require('../../datasources/podConstructor.js')
const nodeData = require('../../datasources/nodeConstructor.js');
// const { mockServer } = require('@graphql-tools/mock');
// const prometheusAPI = require('../../datasources/prometheusAPI');

//set to true to use mockData instead of pulling real k8s cluster data 
const mockMode = false;
const appUrl = 'http://localhost:3000'

//helper function that acts as Object.assign but deeply
const mergeDeep = (target, source) => {
  for (const key in source) {
    if (isObject(source[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      mergeDeep(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
  return target;
};

/** Useful Docs:
 * On accessing grandparents in resolvers https://github.com/graphql/graphql-js/issues/1098
 * a
 */

module.exports = {
  Query: {
    getPods: async (parent, args, context, info) => {
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
          if (original.metadata.name == metrics.metadata.name) {
            original.spec.containers.forEach(container => {
              metrics.containers.reduce((origCont, metricCont) => {
                if(origCont.name == metricCont.name){
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
      const allNodePercentages = (await nodeData.getPercentages())
      const allNodeMetrics = (await nodeData.getNodeMetrics()).items;
      // console.log(nodeMetrics);
      // console.log(nodeMetrics[0].metadata);
      // console.log(nodeMetrics[0].usage);
      // console.log(mockNodes);
      nodes.forEach(node => {
        const nodePercent = find(allNodePercentages, { NAME: [node.metadata.name]});
        node.status.usagePercent = {
          cpu: nodePercent['CPU%'][0],
          memory: nodePercent['MEMORY%'][0],
          cpuCores: nodePercent['CPU(cores)'][0],
          memoryBytes: nodePercent['MEMORY(bytes)'][0]
        }

        const nodeMetrics = find(allNodeMetrics, { metadata: { name: node.metadata.name} })
        node.status.usage = nodeMetrics.usage;
        

        node.status.allocatable.ephemeralStorage = node.status.allocatable["ephemeral-storage"];
      });
      return nodes
    },
    cpuUsage: async (parent, args, { dataSources }, info) => {
      return dataSources.prometheusAPI.getCpuUsageSecondsRateByName('2021-05-28T14:55:06.753Z', '2021-05-28T20:55:05.208Z', '10m')
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
