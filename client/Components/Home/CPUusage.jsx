import React, { useState } from "react";

function CPUusage() {

//   const [diskSpace, setdiskSpace] = useState(0);

  // async function fetchData() {
  //     const result = await fetch("/graphql", {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         query: `
  //                     {
  //                         getPods{
  //                           metadata{
  //                             name
  //                             namespace
  //                             labels{
  //                               app
  //                             }
  //                           }
  //                           status{
  //                             phase
  //                             conditions{
  //                               reason
  //                               message
  //                             }
  //                             podIP
  //                             startTime
  //                           }
  //                           spec{
  //                             nodeName
  //                           }
  //                         }
  //                       }
  //                     `,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         setData(res.data.pods);
  //       })
  //       .catch((err) => console.log(err));
  //   }

  //   useEffect(() => fetchData(), []);

  return (
    <div className="cpuUSageContainer">
      <h2>CPU Usage</h2>
      <h1>24</h1>
    </div>
  );
}

export default CPUusage;
