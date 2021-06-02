import React from 'react';
import PodView from './PodView.jsx';
import NodeView from './NodeView.jsx';
import ClusterView from './ClusterView.jsx';
import Settings from './Settings.jsx';
import PodsTable from '../PodView/PodsTable.jsx';

/*
This is the main nav bar that sits on the left of the screen and allows users
to toggle between different views of their Kubernetes Cluster, from pod to node
to the cluster as a whole.
We set up a handler function in the home component and pass it down to the nav bar
so a user can update the state depending on which dashboard view they click on from
the nav bar.
*/

const Navbar = ({ handler }) => {
  return (
    <div className="navbarContainer">
      <div className="logoHeader">
        <img
          id="dashboardLogo"
          src="./../assets/ShipShapeWhiteLogo.png"
          height="60px"
          width="60px"
        />
        <p id="nav-bar-wordmark" className="shipShape">ShipShape</p>
      </div>
      <div className="subjectContainer">
        <PodView handler={handler} />
        <NodeView handler={handler} />
        <ClusterView handler={handler} />
        <Settings />
      </div>
    </div>
  );
};

export default Navbar;
