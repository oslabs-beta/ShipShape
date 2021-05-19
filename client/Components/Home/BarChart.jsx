import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  const [chartData, setChartData] = useState({});

  function chart() {
    setChartData({
      labels: ["pod 1", "pod 2", "pod 3", "pod 4", "pod 5"],
      datasets: [
        {
          label: "CPU Usage by Container",
          data: [23, 2, 24, 12, 54],
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
