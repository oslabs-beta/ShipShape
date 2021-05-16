function Node(data) {
  this.name = data.metadata.name;
  this.cpuCapacity = data.status.capacity.cpu;
  this.storageCapacity = data.status.capacity['ephemeral-storage'];
  this.memoryCapacity = data.status.capacity.memory;
  this.cpuAllocatable = data.status.allocatable.cpu;
  this.storageAllocatable = data.status.allocatable['ephemeral-storage'];
  this.memoryAllocatable = data.status.allocatable.memory;
}

module.exports = Node