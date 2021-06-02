const PrometheusAPI = require("./prometheusAPI");

const memory = {
  isPrometheusUp: { check: false },
} 

module.exports = () => {
  return {
    prometheusAPI: new PrometheusAPI(memory),
  }
}