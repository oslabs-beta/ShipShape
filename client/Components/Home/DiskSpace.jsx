import React, { useEffect, useState } from "react";
import AnimatedNumber from "animated-number-react";


function DiskSpace() {

  const [state, setState] = useState(0);

  useEffect(() => {
    setState(4000)
  })

    return (
      <div className="diskSpaceContainer">
      <h2>Disk Space</h2>
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

export default DiskSpace;
