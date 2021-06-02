import React, { useEffect, useState } from 'react';
import AnimatedNumber from 'animated-number-react';
import { StaticRouter } from 'react-router';

/*
This is a static number that displays the CPU usage of a selected node.

*/

const CPUusage = ({ selectedNodeData }) => {
  const [state, setState] = useState(0);

  // const allLetters = /[a-z|%]*/gi
  let cpuUsage;
  if (selectedNodeData.status) {
    const allLetters = /[a-z|%]*/gi;
    cpuUsage = selectedNodeData.status.usagePercent.cpuCores.replace(allLetters, '');

    // console.log('coming from selectedNodeData', selectedNodeData)
    // console.log('trying to  get cpu usage', selectedNodeData.status.usage.cpu)
    // console.log(cpuUsage)
  }

  useEffect(() => {
    setState(Number(cpuUsage));
  });

  return (
    <div className="cpuUSageContainer">
      <h2>CPU Usage</h2>
      <div className="animatedNumber">
        <AnimatedNumber
          value={state}
          formatValue={v => v.toFixed(0)}
          duration={1000}
          frameStyle={perc => (
            { opacity: perc / 100 }
          )}
          style={
            {
              fontSize: 200,
            }
          }
        />
        <p>m</p>
      </div>
    </div>
  );
};

export default CPUusage;
