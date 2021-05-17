import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';


const columns = [
  { field: 'id', headerName: 'ID', width: 70,  headerAlign: 'center', align: 'center'},
  { field: 'Name', headerName: 'Name', width: 300,  headerAlign: 'center', align: 'center' },
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

const rows = [
  { id: 1, Status: 'Running', Name: 'Kubernetes-Dashboard-1294912x', Restarts: 123, Age: 35, CPU:120, Memory: 235 },
  { id: 2, Status: 'Failed', Name: 'Kubernetes-Dashboard-1294912x', Restarts: 123, Age: 42, CPU:120, Memory: 235 },
  { id: 3, Status: 'Running', Name: 'Kubernetes-Dashboard-1294912x', Restarts: 123, Age: 45, CPU:132, Memory: 235 },
  { id: 4, Status: 'Pending', Name: 'Kubernetes-Dashboard-1294912x', Restarts: 123, Age: 16, CPU:230, Memory: 235 },
  { id: 5, Status: 'Running', Name: 'Kubernetes-Dashboard-1294912x', Restarts: 123, Age: 21, CPU:120, Memory: 235 },
  { id: 6, Status: 'Pending', Name: 'Kubernetes-Dashboard-1294912x', Restarts: 123, Age: 15, CPU: 958, Memory: 21 },
  { id: 7, Status: 'Running', Name: 'Kubernetes-Dashboard-1294912x', Restarts: 123, Age: 44, CPU: 972, Memory: 82 },
  { id: 8, Status: 'Running', Name: 'Kubernetes-Dashboard-1294912x', Restarts: 123, Age: 36, CPU: 972, Memory: 82 },
  { id: 9, Status: 'Running', Name: 'Kubernetes-Dashboard-1294912x', Restarts: 123, Age: 65, CPU: 972, Memory: 82 },
];

export default function PodsTable() {
  return (
    <div className='podsTable' >
      <DataGrid className='pods' rows={rows} columns={columns} pageSize={10}/>
    </div>
  );
}
