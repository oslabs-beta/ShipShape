import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";



const DoughnutChart = () => {
  const [chartData, setChartData] = useState({});

  function chart() {
    setChartData({
      labels: ["Available Space", "Memory Used"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 100],
          backgroundColor: [
            "rgb(38,84,121)",
            "rgb(160,192,206)",
            "rgb(225, 205, 181)",
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
        className="doughnutContai"
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
