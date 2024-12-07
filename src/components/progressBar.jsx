import React, { useContext, useEffect, useState } from "react";
import './progressBar.css';
import axios from "axios";
import { UsernameContext } from "../contexts/UsernameContext";

const ProgressBar = (props) => {
    const [item, setItem] = useState(props.text);
    const [progress, setProgress] = useState(props.progress);
    const [amount, setAmount] = useState('');
    const [goal, setGoal] = useState(props.amount);
    const [totalPayment, setTotalPayment] = useState(0);

    const { variable } = useContext(UsernameContext);

    const handleContribute = () => {
        if (progress >= goal) {
            alert("Goal Completed");
        } else {
            if (Number.isNaN(parseFloat(amount))) {
                console.log("no amount entered");
            }
            else {
                let temp = parseFloat(progress);
                temp = temp + parseFloat(amount);
                if (temp < goal) {
                    setProgress(temp.toFixed(2));
                    updatePaymentTotal(amount);
                } else {
                    setProgress(goal);
                    updatePaymentTotal(goal - progress);
                }
                
                let progressPercentage = (temp.toFixed(2) / goal) * 100;
                let progWidth = progressPercentage < 100 ? progressPercentage : 100;
                // change local balance on savings goal page by subtracting contribution amount to current balance
                addContribute(temp.toFixed(2) < goal ? temp.toFixed(2) : goal , progWidth);
            }
            setAmount('');
        }
    }

    const addContribute = (progress, percent) => {
        axios.post('http://localhost:8081/progress/addContribute', {username: variable, progress: progress, percent: percent, dateID: props.id})
        .then(res => {
        });
    }

    const handleReset = () => {
        // change local balance on savings page by adding the progress amount to current balance (negative so method in savings will add it)
        updatePaymentTotal(Number(progress * -1));
        setProgress(0);
        axios.post('http://localhost:8081/progress/reset', {username: variable, dateID: props.id})
        .then(res => {
        });
    }

    const handleDelete = () => {
        updatePaymentTotal(Number(progress * -1));
        props.deleteGoal(props.id);
    }

    const getTotals = () => {
        axios.post('http://localhost:8081/income/getTotal', {username: variable})
        .then(res => {
            const data = res.data;
            const object = data[0];
            if (isNaN(object.income) === false && isNaN(object.payment) === false) {
                setTotalPayment(object.payment);
            }
        });
    }

    const updatePaymentTotal = (amount) => {
        axios.post('http://localhost:8081/progress/updatePayment', {username: variable, amount: amount})
        .then(res => {
        });
    }

    useEffect(() => {
        if (progress >= goal) {
            props.moveToComplete(props.id);
        }
        props.getBalance();
      }, [progress]);

    const progressPercentage = (progress / goal) * 100;
    const progWidth = progressPercentage < 100 ? progressPercentage : 100;

    return (
        <div className="progress-container">
            <div className="progress-label">
                <div className="progress-item-label">{item}</div>
                <div className="progress-goal-label">Goal: ${goal}</div>
                <div className="progress-remaining-label">Remaining: ${goal-progress}</div>
            </div>
            <div className="progress-bar-label">
                <div className="progress-bar">
                    <div className="progress-bar-fill" style={{width: `${progWidth}%`}}></div>
                </div>
                <div className="progress-ratio-label">
                    <div>{progress}</div>
                    <div>/</div>
                    <div>{goal}</div>
                </div>
            </div>
            <div className="progress-input-container">
                <input className="progress-input" type="text" placeholder="$" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                <button className="progress-contribute" onClick={handleContribute}>Contribute</button>
                <button className="progress-reset" onClick={handleReset}>Reset</button>
                <button className="progress-delete" onClick={handleDelete}>Delete Goal</button>
            </div>
        </div>
    )
}

export default ProgressBar;