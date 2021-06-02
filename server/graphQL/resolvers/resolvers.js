const { isObject, find } = require('lodash');
const k8sApi = require('../../k8sApi');
const podData = require('../datasources/podConstructor')
const nodeData = require('../datasources/nodeConstructor');
const demo = require('../demoData/demoData');

// set to true to use mockData instead of pulling real k8s cluster data
const demoMode = process.env.DEMO_MODE;

// helper function that acts as Object.assign but deeply
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

/*
  * TODO: Implement pagination: https://www.apollographql.com/docs/tutorial/resolvers/#paginate-results
  * TODO: Abstract mergeDeep function
  * TODO: Cleamup messy merge below
 */

/** Useful Docs:
 * On accessing grandparents in resolvers https://github.com/graphql/graphql-js/issues/1098
 * a
 */

module.exports = {
  Query: {
    getPods: async (parent, args, context, info) => {
      /** NEW CODE  */
      if (demoMode) return demo.pods;

      const podsApi = (await k8sApi.listPodForAllNamespaces()).response.body.items;
      const podsCmd = (await podData.getMetrics()).items;

      // Brute force approach to merging these two datasources by cycling through to match on pod name and  container name
        // should be refactored using only forEach, or better yet a findOne style method would improve performance;
        // I also feel like we should fold container status into this query as well
        // question though - how closely do we want to match original data source? This could allow us to build a graphQL tool
        // maybe use a lodash function https://lodash.com/docs/4.17.15; this will likely have a similar time complexity,
        // but it will be more declarative and easier to read.

      const podArray = [];
      podsApi.forEach((pod) => {
        const mergedPod = podsCmd.reduce((original, metrics) => {
          if (original.metadata.name == metrics.metadata.name) {
            original.spec.containers.forEach(container => {
              metrics.containers.reduce((origCont, metricCont) => {
                if (origCont.name === metricCont.name) return mergeDeep(origCont, metricCont);
                return origCont;
              }, container);
            });
          }
          return original;
        }, pod);
        podArray.push(mergedPod);
      });
      return podArray;
    },
    nodes: async (parent, args, context, info) => {
      if (demoMode) return demo.nodes;

      const nodes = (await k8sApi.listNode('default')).response.body.items;
      const allNodePercentages = (await nodeData.getPercentages());
      const allNodeMetrics = (await nodeData.getNodeMetrics()).items;

      nodes.forEach(node => {
        const nodePercent = find(allNodePercentages, { NAME: [node.metadata.name] });
        node.status.usagePercent = {
          cpu: nodePercent['CPU%'][0],
          memory: nodePercent['MEMORY%'][0],
          cpuCores: nodePercent['CPU(cores)'][0],
          memoryBytes: nodePercent['MEMORY(bytes)'][0],
        };

        const nodeMetrics = find(allNodeMetrics, { metadata: { name: node.metadata.name } });
        node.status.usage = nodeMetrics.usage;

        node.status.allocatable.ephemeralStorage = node.status.allocatable['ephemeral-storage'];
      });
      return nodes;
    },
    cpuUsage: async (parent, { start, end, step }, { dataSources }, info) => {
      if (demoMode) return demo.cpuUsage(start, end);
      const startTime = new Date(start).toISOString();
      const endTime = new Date(end).toISOString();
      return dataSources.prometheusAPI.getCpuUsageSecondsRateByName(startTime, endTime, step);
    },
    freeMemory: async (parent, { start, end, step }, { dataSources }, info) => {
      if (demoMode) return demo.freeMemory(start, end);
      const startTime = new Date(start).toISOString();
      const endTime = new Date(end).toISOString();
      return dataSources.prometheusAPI.getClusterFreeMemory(startTime, endTime, step);
    },
    networkTransmitted: async (parent, { start, end, step }, { dataSources }, info) => {      
      if (demoMode) return demo.networkTransmitted(start, end);
      const startTime = new Date(start).toISOString();
      const endTime = new Date(end).toISOString();
      return dataSources.prometheusAPI.getNetworkTransmitBytes(startTime, endTime, step);
    },
  },
};
