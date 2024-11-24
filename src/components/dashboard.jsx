import React, { useContext, useEffect, useState } from 'react';
import './Dashboard.css';
import Income from './Income.jsx';
import Payment from './payment.jsx';
import Preview from './preview.jsx';
import Budget from './budget.jsx';
import Savings from './savings.jsx';
import PieChart from './chartjspie.jsx';
import UsernameContextProvider from '../contexts/UsernameContext.jsx';
import { UsernameContext } from '../contexts/UsernameContext.jsx';
import axios from 'axios';

function Dashboard() {
  const [toggleState, setToggleState] = useState(1);

  const { variable } = useContext(UsernameContext);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  //pie loader
  const [data, setData] = useState([]);

  const getBudget = () => {
      axios.post('http://localhost:8081/budget/getBudget', {username: variable})
      .then(res => {
        setData(res.data);
        console.log(res);
      });
  }

  const amounts = data.map(item => item.amount);
  const allLabels = data.map(item => item.label);

  useEffect(() => {
      getBudget();
    }, []);

  useEffect(() => {
      // This effect will run every time the `data` state changes
      if (data.length > 0) {
          const amounts = data.map(item => item.amount); // Extract amounts
          const allLabels = data.map(item => item.label); // Extract labels
          // Update dataPoints and labels state with new values
          setDataPoints(amounts);
          setLabels(allLabels);
      }
  }, [data]); // Runs when `data` changes
  
  const [dataPoints, setDataPoints] = useState(amounts);
  const [labels, setLabels] = useState(allLabels);
  //pie loader

  return (
    <div className="dashboard-container">
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
          Payments
        </div>
        <div
          role="tab"
          aria-selected={toggleState === 4}
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
          Budget
        </div>
        <div
          role="tab"
          aria-selected={toggleState === 5}
          className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(5)}
        >
          Savings Goals
        </div>
      </div>

      <div className="content-tabs">
        {toggleState === 1 && (
          <div className="tabs active-tabs">
            <div className='fullpre'>
              <div><Preview/></div>
              <div className='dashboard-budget-container'>
                <h1 className='dashboard-budget-header'>Budget</h1>
                <div className='chart'><PieChart labels={labels} dataPoints={dataPoints} /></div>
              </div>
            </div>
          </div>
        )}

        {toggleState === 2 && (
          <div className="tabs active-tabs">
            <h2>Income</h2>
            <hr className='divider'/>
            <Income/>
          </div>
        )}

        {toggleState === 3 && (
          <div className="tabs active-tabs">
            <h2>Payments</h2>
            <hr className='divider'/>
            <Payment/>
          </div>
        )}

        {toggleState === 4 && (
          <div className="tabs active-tabs">
            <h2>Budget</h2>
            <hr className='divider'/>
            <Budget/>
          </div>
        )}

        {toggleState === 5 && (
          <div className="tabs active-tabs">
            <h2>Savings Goals</h2>
            <hr className='divider'/>
            <Savings/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
