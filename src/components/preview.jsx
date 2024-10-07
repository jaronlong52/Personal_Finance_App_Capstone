import React, { useState } from "react";
import './preview.css';

function Preview() {
    const [incomeData] = useState([
        { source: 'Salary', amount: 5000 },
        { source: 'Freelance', amount: 1200 },
        { source: 'Sold Car', amount: 800 },
    ]);

    const [paymentData] = useState([
      { source: 'Gas', amount: 500 },
      { source: 'Bills', amount: 2500 },
      { source: 'House', amount: 4000 },
  ]);
  
    const totalIncome = incomeData.reduce((acc, item) => acc + item.amount, 0);

    const pieData = {
      labels: paymentData.map(item => item.source),
      datasets: [{
          data: paymentData.map(item => item.amount),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Add more colors as needed
      }]
  };

  
    return (
        <div className="page-container">
            <div className="income-container">
                <h1>Income Overview</h1>
                <table className="income-table">
                    <thead>
                        <tr>
                            <th>Source</th>
                            <th>Amount ($)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomeData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.source}</td>
                                <td>{item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2>Total Income: ${totalIncome}</h2>
            </div>

            <div className="payment-container">
                <h1>Payment Overview</h1>
                <table className="income-table">
                    <thead>
                        <tr>
                            <th>Source</th>
                            <th>Amount ($)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.source}</td>
                                <td>{item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Preview;
