import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";


/* 
This is a doughnut Chart JS imported from chart.js that displays the selected 
pods memory usage by container. The selectedPodData is being passed down from
the pod dashboard component, so the doughnut graph will update based on which
pod a user selects from the pod table. 
*/


const DoughnutChart = ({ selectedPodData }) => {
  const [chartData, setChartData] = useState({});


  if(selectedPodData.spec){
    if(chartData.labels[0] !== selectedPodData.spec.containers[0].name){
      const { containers } = selectedPodData.spec
      // console.log(containers)

      const labels = [], memoryUsage = [];

      containers.forEach(cont => {
        const allLetters = /[a-z]*/gi
        let memory = cont.usage.memory
        if(memory) memory = memory.replace(allLetters,'');
        // console.log(memory);
        labels.push(cont.name)
        memoryUsage.push(memory)
      })

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Memory Usage by Container",
            data: memoryUsage,
            backgroundColor: [
              'rgb(160, 192, 206)',
              'rgb(38, 84, 121)',
              'rgb(147, 176, 189)',
              'rgb(127, 152, 163)',
              'rgb(103, 131, 143)',
              'rgb(78, 113, 128)',
              'rgb(47, 91, 110)',
              'rgb(29, 82, 105)',
              'rgb(38, 84, 121)',
              'rgb(23, 61, 105)',
              'rgb(15, 46, 82)',
              'rgb(8, 31, 58)',
              'rgb(3, 17, 32)',
              'rgb(1, 5, 10)',
              'rgb(0, 0, 0)',              
            ],
            hoverOffset: 4,
          },
        ],
      });
    }
  }


  function chart() {
    setChartData({
      labels: ["Loading..."],
      datasets: [
        {
          label: "My First Dataset",
          data: [0],
          backgroundColor: [
            "rgb(38,84,121)",
            "rgb(160,192,206)",
            "rgb(38,84,121)",
            "rgb(160,192,206)",
            "rgb(38,84,121)",
            "rgb(160,192,206)",
            "rgb(38,84,121)",
            "rgb(160,192,206)",
            "rgb(38,84,121)",
            "rgb(160,192,206)",
            "rgb(38,84,121)",
            "rgb(160,192,206)",
          ],
          hoverOffset: 4,
        },
      ],
    });
  }

  useEffect(() => {
    chart();
  }, []);

  return (
    <div className="doughnutContainer">
      <Doughnut
        className="doughnutContainer"
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Memory Usage by Container",
            },
          },
        }}
      />
    </div>
  );
};

export default DoughnutChart;
