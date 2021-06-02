const k8s = require('@kubernetes/client-node');

// initialization and standardization of the configuration file
const kubeConfig = new k8s.KubeConfig();
kubeConfig.loadFromDefault();

// initialization of the K8s api object
const k8sApi = kubeConfig.makeApiClient(k8s.CoreV1Api);

module.exports = k8sApi;
