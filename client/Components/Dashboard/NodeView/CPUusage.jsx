import React, { useEffect, useState } from "react";
import AnimatedNumber from "animated-number-react";
import { StaticRouter } from "react-router";


/*
This is a static number that displays the CPU usage of a selected node. 


*/


const CPUusage = ( {selectedNodeData} ) => {

  const [state, setState] = useState(0);

  // const allLetters = /[a-z|%]*/gi
  // const cpuUsage = selectedNodeData.status ? selectedNodeData.status.usagePercent.cpu.replace(allLetters,'') : undefined;
  let cpuUsage;
  if(selectedNodeData.status){
      const allLetters = /[a-z|%]*/gi
      cpuUsage = selectedNodeData.status.usagePercent.cpu.replace(allLetters,'');
}
console.log('coming from selectedNodeData', selectedNodeData)
useEffect(() => {
  setState(cpuUsage)
}, [])

    return (
      <div className="cpuUSageContainer">
      <h2>CPU Usage</h2>
        <AnimatedNumber
          value={state}
          formatValue={v => v.toFixed(0)}
          duration={1000}
          frameStyle={perc => (
            { opacity: perc / 100}
          )}
          style={
            {
              fontSize: 200
              }
          }
        />
      </div>
    );
 }

export default CPUusage;
