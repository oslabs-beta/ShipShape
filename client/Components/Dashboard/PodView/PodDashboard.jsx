import React, { useEffect, useState } from "react";
// import LineChart from './LineChart.jsx';
import BarChart from "./BarChart.jsx";
// import HeatMap from './HeatMap.jsx';
import PodsTable from "./PodsTable.jsx";
import DoughnutChart from "./Doughnut.jsx";
import { filter, find } from "lodash";

/*
This is the view displayed when pod view is clicked on the nav bar. 
The pod view displays the metrics of a kubernetes cluster at a pod level. 
This pod dashboard displays 3 graphs, a bar chart that displays memory usage 
for all the pods in the cluster, a doughnut graph that monitors memory
usage by the selected pod's containers, and a table of all the pods in the cluster. 

We are storing the data recieved from the query, the selected pod, and the 
data of that selected pod here in state and passing it down to each of the 
graphs and the table. 


NOTE: we may move the query to the home component if we impliment context api 
*/


const PodDashboard = () => {
  const [data, setData] = useState([]);
  const [podSelected, setpodSelected] = useState();
  const [selectedPodData, setSelectedPodData] = useState({});

  function changePod(podName) {
    setpodSelected(podName);
    const selectPod = filter(data, { metadata: { name: podName } })[0];
    setSelectedPodData(selectPod);
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
              podIP
              startTime
            }
            spec{
              nodeName
              containers{
                name
                usage {
                  cpu
                  memory
                }
              }
            }
          }
        }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        const pods = res.data.getPods;
        const firstPodName = pods[0].metadata.name;
        const podData = filter(pods, { metadata: { name: firstPodName } })[0]
        setSelectedPodData(podData);
        // setpodSelected(firstPodName);
        setData(pods);
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
      <DoughnutChart selectedPodData={selectedPodData} />
      {/* <LineChart data={data} /> */}
      <BarChart data={data} />
      {/* <BarChart selectedPodData={selectedPodData} /> */}
      {/* <HeatMap data={data} /> */}
      <PodsTable
        data={data}
        changePod={changePod}
        setpodSelected={setpodSelected}
      />
    </div>
  );
}

export default PodDashboard;
