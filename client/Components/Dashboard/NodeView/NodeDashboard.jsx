import React, { useEffect, useState } from 'react';
import { filter, find } from 'lodash';
import NodesTable from './NodesTable.jsx';
import Speedometer from './Speedometer.jsx';
import DiskSpace from './DiskSpace.jsx';
import CPUusage from './CPUusage.jsx';

/*
This is the view displayed when node view is clicked on the nav bar.
The node view displays the metrics of a kubernetes cluster at a node level.
This node dashboard displays 4 items, a modified doughnut 'speedometer' graph
that monitors memory usage by the selected node, and a table of all the node
in the cluster.

We are storing the data recieved from the query, the selected node, and the
data of that selected node here in state and passing it down to each of the
graphs and the table.

NOTE: we may move the query to the home component if we impliment context api
*/

const NodeDashboard = () => {
  const [data, setData] = useState([]);
  const [nodeSelected, setNodeSelected] = useState();
  const [selectedNodeData, setSelectedNodeData] = useState({});

  function changeNode(nodeName) {
    setNodeSelected(nodeName);
    const selectedNode = filter(data, { metadata: { name: nodeName } })[0];
    setSelectedNodeData(selectedNode);
  }

  async function fetchData() {
    const result = await fetch('/graphql', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
              {
                nodes{
                  metadata{
                    name
                    creationTimestamp
                    }
                  status{
                    allocatable{
                      cpu
                      memory
                      ephemeralStorage
                    }
                    usage{
                      cpu
                      memory
                    }
                    usagePercent{
                      cpu
                      cpuCores
                      memory
                      memoryBytes
                    }
                  }
                }
              }
                    `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const { nodes } = res.data;
        const firstNodeName = nodes[0].metadata.name;
        const nodeData = filter(nodes, {
          metadata: { name: firstNodeName },
        })[0];
        setSelectedNodeData(nodeData);
        setData(res.data.nodes);
      })
      .catch((err) => console.log(err));

    return function cleanup() {
      AbortController.abort();
    };
  }

  useEffect(() => fetchData(), []);
  return (
    <div className="nodeDashboard">
      <CPUusage selectedNodeData={selectedNodeData} />
      <Speedometer selectedNodeData={selectedNodeData} />
      <DiskSpace selectedNodeData={selectedNodeData} />
      <NodesTable data={data} changeNode={changeNode} />
    </div>
  );
};

export default NodeDashboard;
