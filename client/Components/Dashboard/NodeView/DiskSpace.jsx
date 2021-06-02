import React, { useEffect, useState } from "react";
import AnimatedNumber from "animated-number-react";

/*
This is a static number that displays the disk space of a selected node. 

Currently, it is using dummy data
*/

const DiskSpace = ( {selectedNodeData }) => {
  const [state, setState] = useState(0);

  let ephemeralStorage;
  if(selectedNodeData.status){
      const allLetters = /[a-z|%]*/gi
      ephemeralStorage = selectedNodeData.status.allocatable.ephemeralStorage.replace(allLetters,'');
    }

    useEffect(() => {
      setState(Number(ephemeralStorage)/1000000)
    });

  return (
    <div className="diskSpaceContainer">
      <h2>Disk Space</h2>
      <div className='animatedNumber'>
      <AnimatedNumber
        value={state}
        formatValue={(v) => v.toFixed(0)}
        duration={1000}
        frameStyle={(perc) => ({ opacity: perc / 100 })}
        style={{
          fontSize: 200,
        }}
      />
      <p>mB</p>
      </div>
    </div>
  );
};

export default DiskSpace;
