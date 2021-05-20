import React, { useEffect, useState } from "react";
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

  async function fetchData() {
    const result = await fetch("/graphql", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
                    {
                        getPods{
                          metadata{
                            name
                            namespace
                            labels{
                              app
                            }
                          }
                          status{
                            phase
                            conditions{
                              reason
                              message
                            }
                            podIP
                            startTime
                          }
                          spec{
                            nodeName
                          }
                        }
                      }
                    `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.data.pods);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => fetchData(), []);

  return (
    <div className="nodeDashboard">
      <CPUusage />
      <Speedometer />
      <DiskSpace />
      {/* <LineChart data={data} /> */}
      {/* <BarChart data={data} /> */}
      {/* <HeatMap data={data} /> */}
      <NodesTable data={data} />
    </div>
  );
}

export default NodeDashboard;
