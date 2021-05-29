import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

/* 
This is the pod table that stores all the information for each pod in a cluster with 
a few important metrics displayed as well as the pod name and its id. We imported a 
DataGrid from Material UI and populated it with pod info from the query made in the pod 
dashboard component ***or maybe home component if we use context api** 

We also passed down the changePod function from the pod dashboard so when a user clicks
on a pod in the table, the graphs change to reflect the data from the selected pod. 

The GetTimeFromStart functions calculates the lifespan of a pod, giving us infromation 
about how long a pod has been running, giving us the age of our pod.

NOTE: add more columns and data 
*/

const PodsTable = ({ data, setpodSelected, changePod }) => {
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
  const rows = [];

  if (data)
    for (let i = 0; i < data.length; i++) {
      let getTimeFromStart = (time) => {
        let ms = new Date() - new Date(time);
        const daysFactor = 86400000,
          hoursFactor = 3600000,
          minutesFactor = 60000,
          secondsFactor = 1000;

        const days = Math.floor(ms / daysFactor);
        ms = ms % daysFactor;
        const hours = Math.floor(ms / hoursFactor);
        ms = ms % hoursFactor;
        const minutes = Math.floor(ms / minutesFactor);
        ms = ms % minutesFactor;
        const seconds = Math.floor(ms / secondsFactor);

        return `${days ? days + "D" : ""} ${hours}:${minutes}`;
      };

      const pod = {
        id: i,
        Status: data[i].status.phase,
        Name: data[i].metadata.name,
        Age: data[i].status.startTime
          ? getTimeFromStart(data[i].status.startTime)
          : "undeployed",
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
};

export default PodsTable;
