const { gql } = require('apollo-server-express')

/** 

There is a weird issue with the first two types listed here. They are nested inside 'Container Statuses'
but I suspect that the object label "running" is dynamic.

Also this schema was only built to handle successful pods; will need more sample JSON from @Whit
to see what fields might be added for pending and failed pods.

*/

module.exports = gql`

type NodeInfo { 
  machineID: String
  systemUUID: String
  bootID: String
  kernelVersion: String
  osImage: String
  containerRuntimeVersion: String
  kubeletVersion: String
  kubeProxyVersion: String
  operatingSystem: String
  architecture: String 
}

type Image { sizeBytes: Int names: [String ] }

type KubeletEndpoint { Port: Int }

type DaemonEndpoints { kubeletEndpoint: KubeletEndpoint }

type Addresses { 
  type: String 
  address: String 
}


type Allocatable { 
  attachablevolumesgcepd: String
  cpu: String
  ephemeralStorage: String
  hugepages2Mi: String
  memory: String
  pods: String 
}

type Capacity { 
  attachablevolumesgcepd: String
  cpu: String
  ephemeralstorage: String
  hugepages2Mi: String
  memory: String
  pods: String 
}

type NodeStatus { 
  images: [Image]
  nodeName: String
  nodeInfo: NodeInfo
  daemonEndpoints: DaemonEndpoints
  addresses: [Addresses ]
  conditions: [ Conditions ]
  allocatable: Allocatable
  capacity: Capacity
  usage: NodeUsage
  usagePercent: NodeUsagePercent 
}

type NodeUsage {
  cpu: String
  memory: String
}

type NodeUsagePercent {
  cpu: String
  cpuCores: String
  memory: String
  memoryBytes:String
}

type NodeSpec { 
  podCIDR: String
  providerID: String
  podCIDRs: [String ] 
}

type Annotations { 
  containergoogleapiscominstance_id: String
  csivolumekubernetesionodeid: String
  nodealphakubernetesiottl: String
  nodegkeiolastappliednodelabels: String
  volumeskubernetesiocontrollermanagedattachdetach: String 
}

type NodeMetadata {
  name: String
  selfLink: String
  uid: String
  resourceVersion: String
  creationTimestamp: String
  managedFields: [ManagedFields ]
  annotations: Annotations 
}

type Node { 
  metadata: NodeMetadata 
  status: NodeStatus 
  spec: NodeSpec 
}


type ManagedFields { 
  manager: String
  operation: String 
  apiVersion: String
  time: String
  fieldsType: String 
}

type Running { 
  startedAt: String 
}

type State { 
  running: Running 
}

# Status of a specific container
type ContainerStatus { 
  name: String
  ready: Boolean
  restartCount: Int
  image: String
  imageID: String
  containerID: String
  started: Boolean
  state: State 
}

type PodIPs { 
  ip: String 
}

# Condition of the Pod, includes reason & message if not "Running"
type Conditions { 
  type: String
  # current status of the pod
  status: String
  lastProbeTime: String
  lastTransitionTime: String 
  lastHeartbeatTime: String
  # reason the pod is not running
  reason: String
  # message about why the pod is not running
  message: String
}

type PodStatus { 
  phase: String
  conditions: [Conditions] 
  hostIP: String
  podIP: String
  podIPs: [PodIPs ]
  startTime: String
  containerStatuses: [ContainerStatus]
  qosClass: String
}

type Tolerations { 
  key: String
  operator: String
  effect: String
  tolerationSeconds: Int 
}

type VolumeMounts { 
  name: String 
  readOnly: Boolean 
  mountPath: String 
}

type Container { 
  name: String
  podName: String
  namespace: String
  image: String
  terminationMessagePath: String
  terminationMessagePolicy: String
  imagePullPolicy: String
  volumeMounts: [VolumeMounts ]
  usage: ContainerUsage 
}

# tells you how much cpu and memory a container is using
type ContainerUsage{
  cpu: String
  memory: String
}

type Secret { 
  secretName: String 
  defaultMode: Int 
}

type Volumes { 
  name: String secret: Secret 
}

# Technical specifications about a pod
type PodSpec { 
  restartPolicy: String
  terminationGracePeriodSeconds: Int
  dnsPolicy: String
  serviceAccountName: String
  serviceAccount: String
  nodeName: String
  schedulerName: String
  priority: Int
  enableServiceLinks: Boolean
  preemptionPolicy: String
  tolerations: [Tolerations ]
  containers: [Container]
  volumes: [Volumes ] 
  
}

type OwnerReferences { 
  apiVersion: String
  kind: String
  name: String
  uid: String
  controller: Boolean
  blockOwnerDeletion: Boolean 
}

# Labels applied to the pods
type Labels { 
  # the application the pod is a part of 
  app: String 
  podtemplatehash: String 
}

# descriptive information about the pod
type PodMetadata { 
  name: String
  generateName: String
  namespace: String
  selfLink: String
  uid: String
  resourceVersion: String
  creationTimestamp: String
  managedFields: [ManagedFields ]
  ownerReferences: [OwnerReferences ]
  labels: Labels 
}

# an individual pod object with all nested data objects
type Pod { 
  metadata: PodMetadata 
  status: PodStatus
  spec: PodSpec 
}

# a standard time series object buil t from a PromQL query
type TimeSeries {
  timestamps: [String]!
  seriesLabels: [String]!
  seriesValues: [[String]]!
}

# the schema allows the following query
type Query {
  # query will return an array of all pods
  getPods: [Pod]
  # query will return an array of all nodes
  nodes: [Node]
  #subqueries 
  cpuUsage(start:String!, end:String!, step:String!): TimeSeries @PrometheusUpDirective
  freeMemory(start:String!, end:String!, step:String!): TimeSeries
  networkTransmitted(start:String!, end:String!, step:String!): TimeSeries
}
`