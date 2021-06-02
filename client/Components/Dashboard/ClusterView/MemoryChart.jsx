import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { fetchChartData } from '../../../helpers.js'

/* 
This is a line chart we imported from chart.js to display the Memory usage
of the whole cluster over time. The data from the cluster query is being 
passed down from the cluster dashboard component ***or home component if 
we use context api*** and is used here to populate the data points on the line
graph. 

We wanted to make this a streaming live data chart initally, but never
got that fully Implemented. 
*/

const colors = ["rgb(160, 192, 206)", "rgb(38,84,121)", "rgb(207, 225, 232)"];

const MemoryChart = ({ chartDurationHours }) => {
  const [chartData, setChartData] = useState({});

  async function chart() {
    const data = await fetchChartData('freeMemory', chartDurationHours, '5m')
    setChartData(data);
  }

  useEffect(() => {
    chart();
  }, [chartDurationHours]);

  return (
    <div className="StreamingMemoryChart streams">
      <Line
        data={chartData}
        options={{
          pointRadius: 0,
          borderColor: 'rgb(38,84,121)',
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            title: { text: "Memory Usage", display: true },
          },          
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default MemoryChart;