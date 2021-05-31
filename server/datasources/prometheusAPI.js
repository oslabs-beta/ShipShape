const {RESTDataSource} = require('apollo-datasource-rest');
// docs: https://www.apollographql.com/docs/apollo-server/data/data-sources/

const prometheusURL = 'http://127.0.0.1:9090/api/v1/';

//http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total{container_name!="POD",namespace!=""}[5m])) by (namespace)&start=2021-05-26T20:55:06.753Z&end=2021-05-28T20:55:05.208Z&step=1m


class PrometheusAPI extends RESTDataSource{
  constructor(){
    super()
    this.baseURL = prometheusURL;
  }

  async getCpuUsageSecondsRateByName(startDateTime, endDateTime, step){
    let query = `query_range?query=sum(rate(container_cpu_usage_seconds_total{container_name!="POD",namespace!=""}[${step}])) by (namespace)`
    query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`
    const data = await this.get(query).then( ({ data }) => data.result);

    // console.log(data);
    //construct the response object for the front-end by flattening the query result
    const res = {
      timestamps: [],
      seriesLabels: [],
      seriesValues: [],
    };

    //take the timestamps from the first series to create our x-axis, using regex to grab the time.
    const timeFilter = /[0-9][0-9]:[0-9][0-9]/
    res.timestamps = data[0].values.map(vals => new Date(1000 * vals[0]).toISOString().match(timeFilter)[0])
   
    //build each dataset
    data.forEach(dataset => {
      res.seriesLabels.push(dataset.metric.namespace); // add a new dataseries label to our res
      res.seriesValues.push(dataset.values.map(vals => vals[1])); // add the dataseries to our res
    });
    // console.log(res)
    return res;
  }



}

module.exports = PrometheusAPI;