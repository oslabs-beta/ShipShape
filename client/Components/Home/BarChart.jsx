import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ( { data } ) => {

  const [chartData, setChartData] = useState({
    labels: ["loading..."],
    datasets: [
      {
        label: "LOADING...",
        data: [0],
        backgroundColor: [
          // 'rgb(144, 112, 140)'
          "rgb(38,84,121)",
        ],
        borderWidth: 5,
      },
    ],
  });
 
  const labels = [], memoryUsage = [];  

  if(data[0]){

      data.forEach((container, index) => {
        const allLetters = /[a-z]*/gi
        let memory = 0;
         if(container.spec.containers[1]){
           let memory2 = container.spec.containers[1].usage.memory.replace(allLetters, '')
            memory = Number(container.spec.containers[0].usage.memory.replace(allLetters, '')) + Number(memory2); 
         } else {
            memory = Number(container.spec.containers[0].usage.memory.replace(allLetters, ''))
         }
         memoryUsage.push(memory);
         labels.push(`Pod ${index}`);
      })
      

   
};

function chart() {
  setChartData({
    labels: labels,
    datasets: [
      {
        label: "Memory Usage by Pod",
        data: memoryUsage,
        backgroundColor: [
          // 'rgb(144, 112, 140)'
          "rgb(38,84,121)",
          "rgb(38,84,121)",
          "rgb(38,84,121)",
          "rgb(38,84,121)",
          "rgb(38,84,121)",
          "rgb(38,84,121)",
          "rgb(38,84,121)",
          "rgb(38,84,121)",
          "rgb(38,84,121)",
          "rgb(38,84,121)",
          "rgb(38,84,121)",
          "rgb(38,84,121)",
          "rgb(38,84,121)",
        ],
        borderWidth: 2,
        maxBarThickness: 50,
      },
    ],
  });
};

useEffect(() => {
  chart();
}, [data]);

  return (
    <div className="barChart">
      <Bar
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


export default BarChart;
