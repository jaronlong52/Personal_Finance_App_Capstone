import React, { useState } from "react";
import './progressBar.css';

const ProgressBar = (props) => {
    const [item, setItem] = useState(props.text);
    const [progress, setProgress] = useState(0);
    const [amount, setAmount] = useState('');
    const [goal, setGoal] = useState(props.amount);

    const handleContribute = () => {
        if (Number.isNaN(parseFloat(amount))) {
            console.log("no amount entered");
        }
        else {
            let temp = parseFloat(progress);
            temp = temp + parseFloat(amount);
            setProgress(temp.toFixed(2));
        }
        setAmount('');
    }

    const handleReset = () => {
        setProgress(0);
    }

    return (
        <div className="progress-container">
            <div className="progress-label">
                <div className="progress-item-label">{item}</div>
                <div className="progress-goal-label">Goal: {goal}</div>
            </div>
            <div className="progress-bar-label">
                <div className="progress-bar">
                    <div className="progress-bar-fill"></div>
                </div>
                <div className="progress-ratio-label">
                    <div>{progress}</div>
                    <div>/</div>
                    <div>{goal}</div>
                </div>
            </div>
            <input type="text" placeholder="$" value={amount} onChange={(e) => setAmount(e.target.value)}/>
            <button className="progress-contribute" onClick={handleContribute}>Contribute</button>
            <button className="progress-reset" onClick={handleReset}>Reset</button>
            <button className="progress-delete" onClick={() => props.deleteGoal(props.id)}>Delete Goal</button>
        </div>
    )
}

export default ProgressBar;