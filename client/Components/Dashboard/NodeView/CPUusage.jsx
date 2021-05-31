import React, { useEffect, useState } from "react";
import AnimatedNumber from "animated-number-react";


/*
This is a static number that displays the CPU usage of a selected node. 

Currently, it is using dummy data
*/


const CPUusage = () => {

  const [state, setState] = useState(0);

  useEffect(() => {
    setState(400)
  })

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