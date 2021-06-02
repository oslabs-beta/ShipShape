import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

/* 
This is the node table that stores all the information for each node in a cluster with 
a few important metrics displayed as well as the node name and its id. We imported a 
DataGrid from Material UI and populated it with node info from the query made in the node 
dashboard component ***or maybe home component if we use context api** 

We also passed down the changeNode function from the node dashboard so when a user clicks
on a node in the table, the graphs change to reflect the data from the selected node. 

The GetTimeFromStart functions calculates the lifespan of a node, giving us infromation 
about how long a node has been running, giving us the age of our node.

*/


const NodesTable = ({ data, changeNode }) => {
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 70,  headerAlign: 'center', align: 'center'},
    { field: 'Name', headerName: 'Name', width: 300,  headerAlign: 'center', align: 'left' },
    {
      field: 'Age',
      headerName: 'Age',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      headerAlign: 'center',
      align: 'center'
      // valueGetter: (params) =>
      // `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
    { field: 'CPU', headerName: 'CPU(Corses)', width: 180,  headerAlign: 'center', align: 'center' },
    { field: 'Memory', headerName: 'Memory(Bytes)', width: 180,  headerAlign: 'center', align: 'center' },
    {
      field: 'DiskCapacity',
      headerName: 'Disk Capacity',
      type: 'number',
      width: 130,
      headerAlign: 'center',
      align: 'center'
    },
  ];
  
  const rows = [];
  
  let getTimeFromStart = (time) => {
    let ms = new Date() - new Date(time)
    const daysFactor = 86400000, hoursFactor = 3600000, minutesFactor = 60000, secondsFactor = 1000;

    const days = Math.floor(ms / daysFactor);
    ms = ms % daysFactor;
    const hours = Math.floor(ms / hoursFactor);
    ms = ms % hoursFactor;
    const minutes = Math.floor(ms / minutesFactor);
    ms = ms % minutesFactor;
    const seconds = Math.floor(ms / secondsFactor);

    return `${days ? (days + 'D') : ''} ${hours}:${(minutes > 9) ? minutes : '0' + minutes}`
  }
  
  if(data)for(let i=0; i < data.length; i++){
    
    const { status } = data[i];
    
    const node = { 
      id: i, 
      Name: data[i].metadata.name, 
      Age: data[i].metadata.creationTimestamp ? getTimeFromStart(data[i].metadata.creationTimestamp) : 'undeployed', 
      CPU: `${status.usage.cpu} / ${status.allocatable.cpu}`, 
      Memory: `${status.usage.memory} / ${status.allocatable.memory}`,
      DiskCapacity: `${status.allocatable.ephemeralStorage}`, 
    }
    
    rows.push(node)
  }

  return (
    <div className='NodesTable' >
      <DataGrid className='pods' rows={rows} columns={columns} pageSize={10} onRowClick={({ row }) => changeNode(row.Name)}/>
    </div>
  );
}

export default NodesTable;