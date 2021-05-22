import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ( { selectedPodData } ) => {
  const [chartData, setChartData] = useState({});
  console.log(selectedPodData);

  if(selectedPodData.spec){
    if(chartData.labels[0] !== selectedPodData.spec.containers[0].name){
      const { containers } = selectedPodData.spec
      console.log(containers)

      const labels = [], cpuUsage = [];

      containers.forEach(cont => {
        const allLetters = /[a-z]*/gi
        let cpu = cont.usage.cpu
        if(cpu) cpu = cpu.replace(allLetters,'');
        console.log(cpu);
        labels.push(cont.name)
        cpuUsage.push(cpu)
      })
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "CPU Usage by Container",
            data: cpuUsage,
            backgroundColor: [
              // 'rgb(144, 112, 140)'
              "rgb(38,84,121)",
            ],
            borderWidth: 2,
            maxBarThickness: 50,
          },
        ],
      });
    }
  }

  function chart() {
    console.log('chart re-rendering')
  
    setChartData({
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
  }

  useEffect(() => {
    console.log('useEffect');
    chart();
  }, []);

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
