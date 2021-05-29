import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

/* 
This is a doughnut Chart JS imported from chart.js and altered to only show half 
of the circle, giving the appearance of a speedometer. This graph displays the 
selected node memory usage of each node out of the total avaiable memroy. The 
selectedNodeData is being passed down from the node dashboard component, so 
the speedometer graph will update based on which node a user selects from the 
nodes table. 

If a node's memory usage exceeds the total available memory space, the avaiable 
memory section on the graph will display in red. 
*/

const Speedometer = ({ selectedNodeData }) => {
  
  const [chartData, setChartData] = useState({});
  const allLetters = /[a-z|%]*/gi
  const memory = selectedNodeData.status ? selectedNodeData.status.usagePercent.memory.replace(allLetters,'') : undefined;

  if(selectedNodeData.status){
    if(selectedNodeData.metadata.name !== chartData.nodeName){
      const allLetters = /[a-z|%]*/gi
      const memory = selectedNodeData.status.usagePercent.memory.replace(allLetters,'');
      let backgroundColor = 'rgb(160,192,206)';
      let memoryLabel = 'Remaining';
      if (memory > 100){
        backgroundColor = "rgb(181,1,0)"
        memoryLabel = 'Memory Exceeded'
      }
      setChartData({
        labels: ["Memory Used", memoryLabel],
        datasets: [
          {
            label: `${memory}% Memory in Use`,
            data: [memory,100-memory],
            backgroundColor: [
              "rgb(38,84,121)",
              backgroundColor,
            ],
            hoverOffset: 4,
          },
        ],
        nodeName: selectedNodeData.metadata.name
      });
    } 
  }
    
  function chart() {
      setChartData({
      labels: ["Memory Used", "Remaining"],
      datasets: [
        {
          label: "My First Dataset",
          data: [75,25],
          backgroundColor: [
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
    <div className="speedometerContainer">
      <Doughnut
        className="speedometerContainer"
        data={chartData}
        options={{
          rotation: 200.5 * Math.PI,
          circumference: 57.5 * Math.PI,
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: memory ? `${memory}% Memory in Use` : `...Loading`,
            },
          },
        }}
      />
    </div>
  );
};

export default Speedometer;
