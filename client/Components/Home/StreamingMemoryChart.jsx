import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import 'chartjs-plugin-streaming';

const StreamingMemoryChart = () => {

    return (
        <div className='StreamingMemoryChart  streams'>
            <Line
                data={{
                datasets: [{
                    label: 'Dataset 1',
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    lineTension: 0,
                    borderDash: [8, 4]
                }, {
                    label: 'Dataset 2',
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)'
                }]
                }}
                options={{
                scales: {
                    xAxes: [{
                    realtime: {
                        onRefresh: function(chart) {
                        chart.data.datasets.forEach(function(dataset) {
                            dataset.data.push({
                            x: Date.now(),
                            y: Math.random()
                            });
                        });
                        },
                        delay: 2000
                    }
                    }]
                }
                }}
             />
        </div>
    )
};






//   const [chartData, setChartData] = useState({});

//   function chart() {
//     setChartData({
//       labels: ["x", "y", "z", "t", "h"],
//       datasets: [
//         {
//           label: " Live Memory Usage by Container",
//           data: [12, 35, 23, 27, 7, 45],
//           backgroundColor: [
//             // 'rgb(172, 228, 170)' 
//             // "rgb(160,192,206)",
//             "rgb(38,84,121)",
//           ],
//           borderWidth: 5,
//         },
//       ],
//     });
//   }

//   useEffect(() => {
//     chart();
//   }, []);

//   return (
//     <div className="liveLineChart">
//       <Line
//         data={chartData}
//         options={{
//           maintainAspectRatio: false,
//           responsive: true,
//           title: { text: "Some Data", display: true },
//           scales: {
//             yAxes: [
//               {
//                 ticks: {
//                   autoSkip: true,
//                   maxTicksLimit: 10,
//                   beginAtZero: true,
//                 },
//                 gridLines: {
//                   display: false,
//                 },
//               },
//             ],
//             xAxes: [
//               {
//                 gridLines: {
//                   display: false,
//                 },
//               },
//             ],
//           },
//         }}
//       />
//     </div>
//   );
// };

export default StreamingMemoryChart;
