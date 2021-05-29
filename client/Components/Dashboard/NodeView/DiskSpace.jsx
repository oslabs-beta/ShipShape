import React, { useEffect, useState } from "react";
import AnimatedNumber from "animated-number-react";

/*
This is a static number that displays the disk space of a selected node. 

Currently, it is using dummy data
*/

const DiskSpace = () => {
  const [state, setState] = useState(0);

  useEffect(() => {
    setState(4000);
  });

  return (
    <div className="diskSpaceContainer">
      <h2>Disk Space</h2>
      <AnimatedNumber
        value={state}
        formatValue={(v) => v.toFixed(0)}
        duration={1000}
        frameStyle={(perc) => ({ opacity: perc / 100 })}
        style={{
          fontSize: 200,
        }}
      />
    </div>
  );
};

export default DiskSpace;
