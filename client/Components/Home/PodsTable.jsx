import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";



const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "Name",
    headerName: "Name",
    width: 300,
    headerAlign: "center",
    align: "left",
  },
  {
    field: "Status",
    headerName: "Status",
    width: 130,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "containerCount",
    headerName: "Container Count",
    type: "number",
    width: 180,
    headerAlign: "center",
    align: "center", 
    hide: false,
  },
  {
    field: "Age",
    headerName: "Age",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    headerAlign: "center",
    align: "center",
    // valueGetter: (params) =>
    // `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
  {
    field: "nodeName",
    headerName: "Node Name",
    width: 300,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "podIp",
    headerName: "Pod Ip",
    width: 180,
    headerAlign: "center",
    align: "center",
    hide: true,
  },
];

export default function PodsTable({ data, setpodSelected, changePod }) {
  const rows = [];
  // console.log('here11',data);

  

  if (data)
    for (let i = 0; i < data.length; i++) {

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

        return `${days ? (days + 'D') : ''} ${hours}:${minutes}`
      }


      const pod = {
        id: i,
        Status: data[i].status.phase,
        Name: data[i].metadata.name,
        Age: data[i].status.startTime ? getTimeFromStart(data[i].status.startTime) : 'undeployed',
        containerCount: data[i].spec.containers.length,
        podIp: data[i].status.podIP,
        nodeName: data[i].spec.nodeName,
      };
      rows.push(pod);
    }

  return (
    <div className="podsTable">
      <DataGrid
        className="pods"
        rows={rows}
        columns={columns}
        onRowClick={({ row }) => changePod(row.Name)}
        pageSize={10}
      />
    </div>
  );
}
