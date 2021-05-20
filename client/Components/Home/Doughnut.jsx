import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ selectedPodData }) => {
  const [chartData, setChartData] = useState({});


  if(selectedPodData.spec){
    if(chartData.labels[0] !== selectedPodData.spec.containers[0].name){
      const { containers } = selectedPodData.spec
      console.log(containers)

      const labels = [], memoryUsage = [];

      containers.forEach(cont => {
        const allLetters = /[a-z]*/gi
        let memory = cont.usage.memory
        if(memory) memory = memory.replace(allLetters,'');
        console.log(memory);
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
              'rgb(177, 82, 8)',
              'rgb(255, 113, 36)',
              'rgb(172, 111, 130',
              'rgb(195, 150, 52)',
              'rgb(239, 44, 24) ',
              'rgb(164, 112, 202',
              'rgb(216, 193, 226',
              'rgb(147, 150, 89)',
              'rgb(61, 83, 211) ',
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
