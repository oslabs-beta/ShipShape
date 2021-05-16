function Pod(data) {
  this.name = data.metadata.name
  this.namespace = data.metadata.namespace
  this.status = data.status.phase
  this.podIP = data.status.podIP
  this.createdAt = data.status.startTime
  this.nodeName = data.spec.nodeName
  this.labels = data.metadata.labels.run
  
  // grabbing error messages?
  // this.pendingReason;
  // this.pendingMsg;
  // if(this.status === 'Pending' && data.status.conditions[0].type === 'PodScheduled' && data.status.conditions[0].status === 'false'){
  //   this.pendingReason = data.status.conditions.reason;
  //   this.pendingMsg = data.status.conditions.message;
  // };

}



module.exports = Pod