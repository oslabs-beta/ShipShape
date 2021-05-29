import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

/* 
This is a line chart we imported from chart.js to display the CPU usage
of the whole cluster over time. The data from the cluster query is being 
passed down from the cluster dashboard component ***or home component if 
we use context api*** and is used here to populate the data points on the line
graph. 

We wanted to make this a streaming live data chart initally, but never
got that fully Implemented. 
*/

const StreamingCpuChart = () => {
  const [chartData, setChartData] = useState({});
  const labels = [
    "TS 1",
    "TS 2",
    "TS 3",
    "TS 4",
    "TS 5",
    "TS 6",
    "TS 7",
    "TS 8",
    "TS 9",
    "TS 10",
    "TS 11",
    "TS 12",
    "TS 13",
    "TS 14",
    "TS 15",
    "TS 16",
    "TS 17",
    "TS 18",
    "TS 19",
    "TS 20",
    "TS 21",
    "TS 22",
    "TS 23",
    "TS 24",
    "TS 25",
    "TS 26",
    "TS 27",
    "TS 28",
    "TS 29",
    "TS 30",
    "TS 31",
    "TS 32",
    "TS 33",
    "TS 34",
    "TS 35",
    "TS 36",
    "TS 37",
    "TS 38",
    "TS 39",
    "TS 40",
    "TS 41",
    "TS 42",
    "TS 43",
    "TS 44",
    "TS 45",
    "TS 46",
    "TS 47",
    "TS 48",
    "TS 49",
    "TS 50",
  ];
  const dataset1 = [
    249, 323, 190, 178, 30, 190, 178, 130, 72, 12, 323, 190, 178, 30, 190, 178,
    130, 72, 323, 190, 178, 30, 190, 178, 130, 72, 323, 190, 178, 30, 190, 178,
    130, 72, 323, 190, 178, 30, 190, 178, 130, 72,
  ];
  const dataset2 = [
    184, 152, 300, 212, 187, 190, 178, 80, 32, 63, 187, 190, 178, 80, 32, 187,
    190, 178, 80, 32, 187, 190, 178, 80, 32, 187, 190, 178, 80, 32, 187, 190,
    178, 80, 32, 187, 190, 178, 80, 32,
  ];
  const dataset3 = [
    134, 142, 153, 152, 77, 190, 178, 90, 17, 23, 323, 190, 178, 30, 190, 178,
    323, 190, 178, 30, 190, 178, 323, 190, 178, 30, 190, 178, 323, 190, 178, 30,
    190, 178, 323, 190, 178, 30, 190, 178,
  ];
  const colors = ["rgb(38,84,121)", "rgb(160, 192, 206)", "rgb(207, 225, 232)"];

  function chart() {
    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Namespace 1",
          data: dataset1,
          backgroundColor: colors[0],
        },
        {
          label: "Namespace 2",
          data: dataset2,
          backgroundColor: colors[1],
        },
        // {
        //   label: "Dataset 3",
        //   data: null,
        //   backgroundColor: colors[2],
        // },
        // {
        //   label: "Streaming CPU Usage",
        //   data: [1, 15, 23, 37, 7, 14],
        //   backgroundColor: [
        //     "rgb(172, 228, 170)",
        //     "rgb(160,192,206)",
        //     "rgb(38,84,121)",
        //   ],
        //   borderWidth: 5,
        //   maxBarThickness: 50,
        // },
      ],
    });
  }

  useEffect(() => {
    chart();
  }, []);

  return (
    <div className="StreamingCpuChart streams">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Stacked Namespace CPU Usage",
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
