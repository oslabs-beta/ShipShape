/** 

There is a weird issue with the first two types listed here. They are nested inside 'Container Statuses'
but I suspect that the object label "running" is dynamic.

Also this schema was only built to handle successful pods; will need more sample JSON from @Whit
to see what fields might be added for pending and failed pods.

*/

module.exports = `

type Running { 
  startedAt: String 
}

type State { 
  running: Running 
}

# Status of a specific container
type ContainerStatuses { 
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
  # reason the pod is not running
  reason: String
  # message about why the pod is not running
  message: String
}

type Status { 
  phase: String
  conditions: [Conditions ] 
  hostIP: String
  podIP: String
  podIPs: [PodIPs ]
  startTime: String
  containerStatuses: [ContainerStatuses ]
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
type Spec { 
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

type ManagedFields { 
  manager: String
  operation: String
  apiVersion: String
  time: String
  fieldsType: String 
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
type Metadata { 
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
  metadata: Metadata 
  spec: Spec 
  status: Status
}

# the schema allows the following query
type Query {
  # query will return an array of all pods
  pods: [Pod]

  # query will return an array of all pods not running
  podsNotRunning: [Pod]
  
  # query will return an array of all pods of given status
  podsByStatus(status: String!): [Pod]

  # query will return an array of all pods of a given namespace
  podsByNamespace(namespace: String!): [Pod]
}
`