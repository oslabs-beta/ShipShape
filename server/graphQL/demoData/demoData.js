const cpuUsage = require('./CpuUsage.json');
const freeMemory = require('./FreeMemory.json');
const networkTransmitted = require('./NetworkTransmitted.json');
const nodes = require('./nodeData.json');
const pods = require('./podData.json');

const timeSeriesDemo = {
  cpuUsage,
  freeMemory,
  networkTransmitted,
};

const demoTimeSeries = (start, end, type) => {
  console.log('grabbing demo timeSeries for', type);
  const hours = new Date(end).getHours() - new Date(start).getHours();
  const numOfResults = hours * 30;
  const data = timeSeriesDemo[type];
  const timestamps = data.timestamps.slice(0, numOfResults);
  const seriesLabels = data.seriesLabels.slice();
  const seriesValues = data.seriesValues.map(series => series.slice(0, numOfResults));
  return { timestamps, seriesLabels, seriesValues };
};

module.exports = {
  cpuUsage: (start, end) => demoTimeSeries(start, end, 'cpuUsage'),
  freeMemory: (start, end) => demoTimeSeries(start, end, 'freeMemory'),
  networkTransmitted: (start, end) => demoTimeSeries(start, end, 'networkTransmitted'),
  nodes,
  pods,
};
