import React from 'react';
import NodeDashboard from './NodeView/NodeDashboard.jsx';
import PodDashboard from './PodView/PodDashboard.jsx';
import ClusterDashboard from './ClusterView/ClusterDashboard.jsx';

/*
This is the dashboard view hub that will render whichever dashboard view the user clicks on
from the nav bar, using the props "view" that is being passed down from the home component.
The state of the view string is altered in the nav bar, and that change is reflected here
and determins which dashboard view will be rendered.
*/

const Dashboard = ({ view }) => {
  return (
    <div className="mainDashboard">
      {view === 'pod' ? (
        <PodDashboard />
      ) : view === 'node' ? (
        <NodeDashboard />
      ) : (
        <ClusterDashboard />
      )}
    </div>
  );
};

export default Dashboard;
