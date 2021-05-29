const {RESTDataSource} = require('apollo-datasource-rest');
const { conformsTo } = require('lodash');
// docs: https://www.apollographql.com/docs/apollo-server/data/data-sources/

const prometheusURL = 'http://127.0.0.1:9090/api/v1/';



class PrometheusAPI extends RESTDataSource{
  constructor(){
    super()
    this.baseURL = prometheusURL;
  }

  async getCpuUsageSecondsTotal(startDateTime, endDateTime, step){
    let str = 'query_range?query=sum(rate(container_cpu_usage_seconds_total[1m]))/sum((machine_cpu_cores)*100)&'
    str += 'start='+startDateTime+'&end='+endDateTime+'&step='+step
    const data = await this.get(str)
    const res = this.convertToObjects(data.data.result[0].values)
    console.log(res)
    return res;
  }
  



}

module.exports = PrometheusAPI;