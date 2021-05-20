import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

const Speedometer = () => {
  const [chartData, setChartData] = useState({});

  function chart() {
    setChartData({
      labels: ["Allocatable Space", "Memory Used", "X"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 100, 50],
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
    <div className="speedometerContainer">
      <Doughnut
        className="speedometerContainer"
        data={chartData}
        options={{
          rotation: 200 * Math.PI,
          circumference: 58 * Math.PI,
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

export default Speedometer;
