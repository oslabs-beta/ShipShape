const PrometheusAPI = require('./prometheusAPI');

const memory = {
  isPrometheusUp: { check: false },
};

// eslint-disable-next-line arrow-body-style
module.exports = () => {
  return {
    prometheusAPI: new PrometheusAPI(memory),
  };
};
