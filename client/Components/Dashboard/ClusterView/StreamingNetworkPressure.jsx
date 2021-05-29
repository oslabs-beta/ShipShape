import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

/* 
This is a line chart we imported from chart.js to display the Network Pressure 
of the whole cluster over time. The data from the cluster query is being 
passed down from the cluster dashboard component ***or home component if 
we use context api*** and is used here to populate the data points on the line
graph. 

We wanted to make this a streaming live data chart initally, but never
got that fully Implemented. 
*/

const StreamingNetworkPressure = () => {
  const [chartData, setChartData] = useState({});

  function chart() {
    setChartData({
      labels: ["x", "y", "z", "t", "h"],
      datasets: [
        {
          label: "Streaming Network Pressure",
          data: [12, 35, 23, 27, 7, 45],
          backgroundColor: [
            // 'rgb(172, 228, 170)' 
            // "rgb(160,192,206)",
            "rgb(38,84,121)",
          ],
          borderWidth: 5,
        },
      ],
    });
  }

  useEffect(() => {
    chart();
  }, []);

  return (
    <div className="StreamingNetworkPressure streams">
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          title: { text: "Some Data", display: true },
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

export default StreamingNetworkPressure;
