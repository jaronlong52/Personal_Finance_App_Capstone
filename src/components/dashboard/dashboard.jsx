import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="container">
      <div className="bloc-tabs">
        <div
          role="tab"
          aria-selected={toggleState === 1}
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Dashboard
        </div>
        <div
          role="tab"
          aria-selected={toggleState === 2}
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Income
        </div>
        <div
          role="tab"
          aria-selected={toggleState === 3}
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Planning
        </div>
      </div>

      <div className="content-tabs">
        {toggleState === 1 && (
          <div className="tabs active-tabs">
            <h2>Dashboard</h2>
            <hr />
            <p>Placeholder for dashboard info</p>
          </div>
        )}

        {toggleState === 2 && (
          <div className="tabs active-tabs">
            <h2>Income</h2>
            <hr />
            <p>Placeholder for income info page</p>
          </div>
        )}

        {toggleState === 3 && (
          <div className="tabs active-tabs">
            <h2>Planning</h2>
            <hr />
            <p>Placeholder for planning tab</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;