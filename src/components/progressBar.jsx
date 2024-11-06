import React, { useState } from "react";
import './progressBar.css';

const ProgressBar = () => {
    const [item, setItem] = useState('New Bike');
    const [progress, setProgress] = useState(100);
    const [amount, setAmount] = useState();
    const [goal, setGoal] = useState(500);

    const handleContribute = () => {
        setProgress(amount);
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
        </div>
    )
}

export default ProgressBar;