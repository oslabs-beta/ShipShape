const cpuUsage = require('./CpuUsage.json');
const freeMemory = require('./FreeMemory.json');
const networkTransmitted = require('./NetworkTransmitted.json');
const nodes = require('./nodeData.json');
const pods = require('./podData.json');

module.exports = {
  cpuUsage,
  freeMemory,
  networkTransmitted,
  nodes,
  pods,
};
