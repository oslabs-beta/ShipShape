import React, { useState, useEffect } from "react";
import PodView from "./PodView.jsx";
import NodeView from "./NodeView.jsx";
import ClusterView from "./ClusterView.jsx"
import Settings from "./Settings.jsx";
import PodsTable from "./PodsTable.jsx";

function Navbar( {handler} ) {
  const [dashboardLoaded, setdashboardLoaded] = useState("podsView");
  const [podsData, setpodsData] = useState([]);
  const [nodesData, setnodesData] = useState([]);
  const [clusterData, setclusterData] = useState([]);

  // async function fetchData() {
  //   const result = await fetch("/graphql", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       query: `
  //                   {
  //                       getPods{
  //                         metadata{
  //                           name
  //                           namespace
  //                           labels{
  //                             app
  //                           }
  //                         }
  //                         status{
  //                           phase
  //                           conditions{
  //                             reason
  //                             message
  //                           }
  //                           podIP
  //                           startTime
  //                         }
  //                         spec{
  //                           nodeName
  //                         }
  //                       }
  //                     }
  //                   `,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setpodsData(res.data.pods);
  //     })
  //     .catch((err) => console.log(err));
  // }

  // useEffect(() => fetchData(), []);

  return (
    <div className="navbarContainer">
      <div className="logoHeader">
        <img
          id="dashboardLogo"
          src="./../assets/ShipShapeWhiteLogo.png"
          height="60px"
          width="60px"
        />
        <p className="shipShape">ShipShape</p>
      </div>
      <div className="subjectContainer">
        {/* {dashboardLoaded === "podsView" && <PodView data={podsData} />}

        {dashboardLoaded === "nodeView" && <PodsTable data={nodesData} />} */}
        <PodView handler={handler}/>
        <NodeView handler={handler}/>
        <ClusterView handler={handler}/>
        <Settings />
      </div>
    </div>
  );
}

export default Navbar;
