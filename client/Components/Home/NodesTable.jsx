import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';


const columns = [
  { field: 'id', headerName: 'ID', width: 70,  headerAlign: 'center', align: 'center'},
  { field: 'Name', headerName: 'Name', width: 300,  headerAlign: 'center', align: 'left' },
  { field: 'Status', headerName: 'Status', width: 130,  headerAlign: 'center', align: 'center' },
  {
    field: 'Restarts',
    headerName: 'Restarts',
    type: 'number',
    width: 130,
    headerAlign: 'center',
    align: 'center'
  },
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
  { field: 'Memory', headerName: 'Memory(Bytes)', width: 180,  headerAlign: 'center', align: 'center' }
];

export default function NodesTable({ data }) {
  
  const rows = [];
  // console.log('here11',data);
  if(data)for(let i=0; i < data.length; i++){
    const pod = { id: i, Status: data[i].status.phase, Name: data[i].metadata.name, Restarts: 123, Age: 35, CPU:120, Memory: 235 }
    rows.push(pod)
  }

  return (
    <div className='NodesTable' >
      <DataGrid className='pods' rows={rows} columns={columns} pageSize={10}/>
    </div>
  );
}
