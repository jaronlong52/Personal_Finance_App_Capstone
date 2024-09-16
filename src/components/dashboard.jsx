import React, { useState } from 'react';
import './Dashboard.css'; // Ensure this file exists or comment this out temporarily

function Dashboard() {
    console.log("dashboard loaded");
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="container">
      <div className="bloc-tabs">
        <div
          className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(1)}
        >
          Dashboard
        </div>
        <div
          className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(2)}
        >
          Income
        </div>
        <div
          className={toggleState === 3 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(3)}
        >
          Planning
        </div>
      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}>
          <h2>Dashboard</h2>
          <hr />
          <p>Placeholder for dashboard info</p>
        </div>

        <div className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}>
          <h2>Income</h2>
          <hr />
          <p>Placeholder for income info page</p>
        </div>

        <div className={toggleState === 3 ? 'tabs active-tabs' : 'tabs'}>
          <h2>Planning</h2>
          <hr />
          <p>Placeholder for planning tab</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
