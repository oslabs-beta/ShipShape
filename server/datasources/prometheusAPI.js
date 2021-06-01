const { spawn } = require('child_process')
const {RESTDataSource} = require('apollo-datasource-rest');
// docs: https://www.apollographql.com/docs/apollo-server/data/data-sources/

const prometheusURL = 'http://127.0.0.1:9090/api/v1/';

class PrometheusAPI extends RESTDataSource{
  
  constructor({ isPrometheusUp }){
    super()
    this.baseURL = prometheusURL;
    this.portAttempts = 0;
    this.isPrometheusUp = isPrometheusUp;
    this.portPrometheus = this.portPrometheus.bind(this);
  }

  async getCpuUsageSecondsRateByName(startDateTime, endDateTime, step){
    const checkVar = await this.portPrometheus()
    console.log('checkVar:',checkVar)
    if(!checkVar) return console.log('DEAD') 
    console.log('when does this run?')
    let query = `query_range?query=sum(rate(container_cpu_usage_seconds_total{container_name!="POD",namespace!=""}[2m])) by (namespace)`;
    query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
    const data = await this.get(query).then( ({ data }) => data.result);

    return this.formatResponseObject(data);
  }

  async getClusterFreeMemory(startDateTime, endDateTime, step){
    const checkVar = await this.portPrometheus()
    console.log('checkVar:',checkVar)
    if(!checkVar) return console.log('DEAD') 
    let query = `query_range?query=sum(rate(node_memory_MemFree_bytes[2m]))`;
    query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
    const data = await this.get(query).then(({ data }) => data.result);

    return this.formatResponseObject(data)
  }

  //http://localhost:9090/api/v1/query_range?query=sum(rate(node_network_transmit_bytes[…]2021-05-26T20:55:06.753Z&end=2021-05-28T20:55:05.208Z&step=1m

  async getNetworkTransmitBytes(startDateTime, endDateTime, step){
    const checkVar = await this.portPrometheus()
    console.log('checkVar:',checkVar)
    if(!checkVar) return console.log('DEAD') 
    let query = `query_range?query=sum(rate(node_network_transmit_bytes_total[2m]))`;
    query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
    const data = await this.get(query).then(({ data }) => data.result).catch(err => console.log(err));

    console.log(data);

    return this.formatResponseObject(data)
  } 


  formatResponseObject(data, label){    
    try{ 
      const res = {
        timestamps: [],
        seriesLabels: [],
        seriesValues: [],
      };

      //helper function to convert the Prometheus MS timestamp to HH:MM
      const timeFilter = /[0-9][0-9]:[0-9][0-9]/
      const msToTimestamp = (ms) => new Date(1000 * ms).toISOString().match(timeFilter)[0];

      //pop the last series off the query response to extract timestamp and groupBy label
      const initialSet = data.pop();
      const groupByLabel = Object.keys(initialSet.metric)[0];

      // add this last series to the response object arrays
      res.timestamps = initialSet.values.map(vals => msToTimestamp(vals[0]));
      res.seriesLabels.push(initialSet.metric[groupByLabel] || 'Cluster')
      res.seriesValues.push(initialSet.values.map(vals => vals[1]))
    
      // for each remaining dataset, push the series label and array of datapoints onto the res object
      data.forEach(dataset => {
        res.seriesLabels.push(dataset.metric[groupByLabel]); // add a new dataseries label to our res
        res.seriesValues.push(dataset.values.map(vals => vals[1])); // add the dataseries to our res
      });
      
      //return the constructed response
      return res;
    } catch(err){
      console.log(err);
    }
  }

  portPrometheus = () => new Promise((resolve, reject) => {

    if(this.isPrometheusUp.check) resolve(true);
    
    try{
      const process = spawn('kubectl', ['--namespace=prometheus', 'port-forward', 'deploy/prometheus-server', '9090'])
      this.portAttempts += 1

      process.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        this.isPrometheusUp.check = true;
        resolve(true)
      })

      process.stderr.on('data', async (err) => {
        // console.log(`stderr: ${err}`);
      })

      process.on('close', (code) => {
        if(code === 1) resolve(true)
        else {
          console.log(`child process exited with code ${code}`);
          this.isPrometheusUp.check = false;
        }
      })
    }catch(err){
      console.log(err);
    }

  });
}

module.exports = PrometheusAPI;