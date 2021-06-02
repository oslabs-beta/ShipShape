import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { fetchChartData } from '../../../helpers.js'

/* 
This is a line chart we imported from chart.js to display the CPU usage
of the whole cluster over time. The data from the cluster query is being 
passed down from the cluster dashboard component ***or home component if 
we use context api*** and is used here to populate the data points on the line
graph. 

We wanted to make this a streaming live data chart initally, but never
got that fully Implemented. 
*/

const colors = ["rgb(160, 192, 206)", "rgb(38,84,121)", "rgb(207, 225, 232)"];


const StreamingCpuChart = ({ chartDurationHours }) => {
  const [chartData, setChartData] = useState({});

  async function chart(){
    const data = await fetchChartData('cpuUsage', chartDurationHours, '2m')
    setChartData(data);
  }

  useEffect(() => {
    chart();
  }, [chartDurationHours]);

  return (
    <div className="StreamingCpuChart streams">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "CPU Usage (by Namespace)",
            },
          },
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        }}
      />
    </div>
  );
};

export default StreamingCpuChart;
