const PrometheusAPI = require("./prometheusAPI");

module.exports = () => {
  return {
    prometheusAPI: new PrometheusAPI(),
  }
}