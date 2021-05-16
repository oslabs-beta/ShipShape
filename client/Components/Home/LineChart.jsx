import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const LineChart = () => {
  const [chartData, setChartData] = useState({});

  function chart() {
    setChartData({
      labels: ["x", "y", "z", "t", "h"],
      datasets: [
        {
          label: "Namespaces",
          data: [12, 35, 23, 27, 7, 45],
          backgroundColor: [
            // 'rgb(172, 228, 170)'
            // "rgb(160,192,206)",
            'rgb(38,84,121)'
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
    <div className="lineChart">
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

export default LineChart;
