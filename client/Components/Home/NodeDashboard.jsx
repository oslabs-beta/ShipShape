import React, { useEffect, useState } from "react";
import { filter, find } from "lodash";
// import LineChart from './LineChart.jsx';
import BarChart from "./BarChart.jsx";
// import HeatMap from './HeatMap.jsx';
import NodesTable from "./NodesTable.jsx";
import DoughnutChart from "./Doughnut.jsx";
import Speedometer from "./Speedometer.jsx";
import DiskSpace from "./DiskSpace.jsx";
import CPUusage from "./CPUusage.jsx";


function NodeDashboard() {
  const [data, setData] = useState([]);
  // const [nodeSelected, setNodeSelected] = useState();
  const [selectedNodeData, setSelectedNodeData] = useState({});

  async function fetchData() {
    const result = await fetch("/graphql", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
              {
                nodes{
                  metadata{
                    name
                    creationTimestamp
                    }
                  status{
                    allocatable{
                      cpu
                      memory
                      ephemeralStorage
                    }
                    usage{
                      cpu
                      memory
                    }
                    usagePercent{
                      cpu
                      cpuCores
                      memory
                      memoryBytes
                    }
                  }
                }
              }
                    `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const { nodes } = res.data;
        const firstNodeName = nodes[0].metadata.name;
        const nodeData = filter(nodes, { metadata: { name: firstNodeName } })[0];
        setSelectedNodeData(nodeData);
        setData(res.data.nodes);
      })
      .catch((err) => console.log(err));

      return function cleanup() {
        AbortController.abort();
      };
  }

  useEffect(() => fetchData(), []);
  return (
    <div className="nodeDashboard">
      <CPUusage selectedNodeData={selectedNodeData} />
      <Speedometer selectedNodeData={selectedNodeData} />
      <DiskSpace selectedNodeData={selectedNodeData} />
      {/* <LineChart data={data} /> */}
      {/* <BarChart data={data} /> */}
      {/* <HeatMap data={data} /> */}
      <NodesTable data={data} />
    </div>
  );
}

export default NodeDashboard;
