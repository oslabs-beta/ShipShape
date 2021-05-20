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
    width: 130,
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
    width: 180,
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
        const ms = new Date() - new Date(time)
        console.log(ms);
      
        const daysFactor = 86400000
        const hoursFactor = 3600000
        const minutesFactor = 60000
        const secondsFactor = 1000
        const days = Math.floor(ms / daysFactor);
        let remainder = ms % daysFactor;
        const hours = Math.floor(remainder / hoursFactor);
        remainder = ms % hoursFactor;
        const minutes = Math.floor(remainder / minutesFactor);
        remainder = ms % minutesFactor;
        const seconds = Math.floor(remainder / secondsFactor);
        const miliseconds = remainder;

        return `Days ${days}:Hours ${hours}:Minutes ${minutes}`
      }

      const { startTime } = data[i].status
      const age = startTime 
                    ? new Date(startTime) 
                    : ''

      const pod = {
        id: i,
        Status: data[i].status.phase,
        Name: data[i].metadata.name,
        //example timestamp "2021-05-16T17:57:39Z"
        //new Date() - new Date('2021-05-16T17:57:39Z')
        //https://stackoverflow.com/questions/13601737/how-to-convert-milliseconds-into-a-readable-date-minutesseconds-format
        //https://stackoverflow.com/questions/8579861/how-to-convert-milliseconds-into-a-readable-date
        //whit's a dingus
        
        Age: new Date(data[i].status.startTime),
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
