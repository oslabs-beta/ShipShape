import React, { useEffect, useState } from "react";
// import LineChart from './LineChart.jsx';
import BarChart from "./BarChart.jsx";
// import HeatMap from './HeatMap.jsx';
import PodsTable from "./PodsTable.jsx";
import DoughnutChart from "./Doughnut.jsx";
import { filter } from 'lodash';

function PodDashboard() {
  const [data, setData] = useState([]);
  const [podSelected, setpodSelected] = useState()
  const [selectedPodData, setSelectedPodData] = useState({});

  function changePod(podName){
    setpodSelected(podName)
    const selectPod = filter(data, {metadata : {name : podName}});
    setSelectedPodData(selectPod)
  }  

  async function fetchData() {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const result = await fetch("/graphql", {
      signal: signal,
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
        // console.log(res.data)
        setData(res.data.getPods);
        setpodSelected(res.data.getPods[0].metadata.name)
      })
      .catch((err) => console.log(err));

    return function cleanup() {
      AbortController.abort();
    };
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="podDashboard">
      <DoughnutChart />
      {/* <LineChart data={data} /> */}
      <BarChart data={data} />
      {/* <HeatMap data={data} /> */}
      <PodsTable data={data} eventHandler={changePod} setpodSelected={setpodSelected}/>
    </div>
  );
}

export default PodDashboard;
