import React, { useEffect, useContext, useState } from "react";
import './preview.css';
import { UsernameContext } from "../contexts/UsernameContext";
import axios from "axios";

function Preview() {

    const [income, setIncome] = useState(0);
    const [payment, setPayment] = useState(0);
    const [balance, setBalance] = useState(0);
    const { variable } = useContext(UsernameContext);
    const [savings, setSavings] = useState([]);

    const getTotals = () => {
        axios.post('http://localhost:8081/preview/getTotals', {username: variable})
        .then(res => {
            console.log(res);
            const data = res.data;

            const firstObject = data[0];
            setIncome(firstObject.income);
            setPayment(firstObject.payment);
            setBalance(Number(firstObject.income) - Number(firstObject.payment));
        });
    }

    const getSavings = () => {
        axios.post('http://localhost:8081/preview/getSavings', {username: variable})
        .then(res => {
            console.log(res);
            setSavings(res.data);
        });
    }

    useEffect(() => {
        getTotals();
        getSavings();
      }, []);
  
    return (
        <div className="preview-container">
            <div className="preview-totals-container">
                <h1 className="preview-totals-title">Account Overview</h1>
                <div className="preview-totals-body">
                    <h3 className="preview-totals-income">Total Income: ${income}</h3>
                    <h3 className="preview-totals-payment">Total Payment: ${payment}</h3>
                    <h3 className="preview-totals-balance">Current Balance: {balance < 0 ? "-" : ""}${Math.abs(balance)}</h3>
                </div>
            </div>
            <div className="preview-savings-container">
                <h1 className="preview-savings-title">Savings Overview</h1>
                <div className="preview-savings-subtitle">
                    <h2>Goals</h2>
                    <h2>Percent Complete</h2>
                </div>
                <hr className='preview-savings-divider'/>
                {savings.map((item, index) => (
                    <div className="preview-savings-body" key={index}>
                        <div className="preview-savings-goal">{item.title}</div>
                        <div className="preview-savings-percent">{Number(item.percentage).toFixed(2)}%</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Preview;
