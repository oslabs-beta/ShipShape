const _ = require('lodash');
const mockData = require('../mockData.json');

module.exports = {
  Query: {
    pods: () => mockData,
    podsByNamespace(parent, args, context){
      return _.filter(pods, { metadata: { namespace : args.namespace } });
    },
    podsNotRunning(parent, args, context){
      return _.reject(pods, { status: { phase : 'Running' } })
    }
  }
}